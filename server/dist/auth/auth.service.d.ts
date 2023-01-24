import { CreateUserDto } from '../user/dto/create-user.dto';
import { IUserService } from '../user/user.service';
import { IToken } from '@interfaces';
import { JwtService } from '@nestjs/jwt';
import { IAccessTokenService } from "../access-token/access-token.service";
export interface IAuthService {
    login: (user: CreateUserDto) => Promise<IToken>;
}
export declare class AuthService implements IAuthService {
    private readonly jwtService;
    private readonly userService;
    private readonly accessTokenService;
    constructor(jwtService: JwtService, userService: IUserService, accessTokenService: IAccessTokenService);
    login(userDto: CreateUserDto): Promise<IToken>;
    private generateToken;
}
