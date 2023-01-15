import {Controller, Inject, Post} from '@nestjs/common';
import {Resource, Service} from '@enums';
import {AuthService} from "./auth.service";
import {CreateUserDto} from "../user/dto/create-user.dto";

@Controller(Resource.Auth)
export class AuthController {
	constructor(@Inject(Service.Auth) private readonly authService: AuthService) {
	}
	
	@Post('login')
	login(user: CreateUserDto) {
		return this.authService.login(user);
	}
}
