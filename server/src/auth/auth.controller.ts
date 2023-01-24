import {Body, Controller, Inject, Post, Req} from '@nestjs/common';
import {Resource, Service} from '@enums';
import {IAuthService} from "./auth.service";
import {CreateUserDto} from "../user/dto/create-user.dto";

@Controller(Resource.Auth)
export class AuthController {
	constructor(@Inject(Service.Auth) private readonly authService: IAuthService) {
	}
	
	@Post('login')
	login(@Body() user: CreateUserDto) {
		return this.authService.login(user);
	}
}
