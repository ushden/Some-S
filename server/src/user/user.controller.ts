import {Controller, Get, Inject, Query} from '@nestjs/common';
import {IUserService} from './user.service';
import {Resource, Service} from "@enums";
import {BaseController} from "../base/base.controller";
import {User} from "./entities/user.entity";

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
  private checkIfExist(@Query('phone') phone: string) {
    return this.usersService.checkIfExist(phone);
  }
}
