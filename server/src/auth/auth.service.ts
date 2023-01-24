import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {CreateUserDto} from '../user/dto/create-user.dto';
import {Service} from '@enums';
import {IUserService} from '../user/user.service';
import {IToken} from '@interfaces';
import {JwtService} from '@nestjs/jwt';
import {User} from '../user/entities/user.entity';
import {tokenTtlMilliseconds} from "@constants";
import {IAccessTokenService} from "../access-token/access-token.service";
import {CreateAccessTokenDto} from "../access-token/dto/create-access-token.dto";

export interface IAuthService {
  login: (user: CreateUserDto) => Promise<IToken>;
}

@Injectable()
export class AuthService implements IAuthService {
	constructor(
		private readonly jwtService: JwtService,
		@Inject(Service.Users) private readonly userService: IUserService,
		@Inject(Service.Token) private readonly accessTokenService: IAccessTokenService,
	) {}
	async login(userDto: CreateUserDto): Promise<IToken> {
		try {
			const candidate = await this.userService.findOne({
				where: {phone: userDto.phone},
				include: ['roles', 'token'],
			});
			
			if (!candidate) {
				const user = await this.userService.createCustomer(userDto);
				
				return await this.generateToken(user);
			}
			
			if (!candidate.token) {
				return await this.generateToken(candidate);
			}
			
			const {token, id: userId, roles, email, phone, verified, name} = candidate;
			
			return {
				id: token.id,
				ttl: tokenTtlMilliseconds,
				userId,
				roles: roles.map(r => r.name),
				email,
				phone,
				verified,
				name,
			}
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
		}
	}
	
	private async generateToken(user: User) {
		const {id: userId, roles, email, phone, verified, name} = user;
		const payload = {userId, roles, email: email || '', phone, verified, name};
		
		const token = await this.jwtService.signAsync(payload);
		const accessToken: CreateAccessTokenDto = {id: token, userId, ttl: tokenTtlMilliseconds};
		
		await this.accessTokenService.create(accessToken);
		
		return {
			ttl: tokenTtlMilliseconds,
			id: token,
			userId,
			roles: roles.map(r => r.name),
			email,
			phone,
			verified,
			name,
		};
	}
}
