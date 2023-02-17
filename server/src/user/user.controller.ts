import {Body, Controller, Get, Inject, Post, Query, UsePipes} from '@nestjs/common';
import {IUserService} from './user.service';
import {Resource, Service} from "@enums";
import {BaseController} from "../base/base.controller";
import {User} from "./entities/user.entity";
import {CreateUserDto} from "./dto/create-user.dto";
import {PhoneTransform} from "@pipes";

@Controller(Resource.User)
export class UserController extends BaseController<User>(User, Service.Users) {
  constructor(@Inject(Service.Users) private readonly usersService: IUserService) {
    super()
  }

  @Get('get-masters')
  private getMasters() {
    return this.usersService.getMasters();
  }
  
  @Get('check-exist')
  @UsePipes(PhoneTransform)
  private checkIfExist(@Query('phone') phone: string) {
    return this.usersService.checkIfExist(phone);
  }
  
  @Post('create-customer')
  private createCustomer(@Body() user: CreateUserDto) {
    return this.usersService.createCustomer(user);
  }
}
