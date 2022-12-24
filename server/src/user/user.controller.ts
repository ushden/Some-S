import {Controller, Inject} from '@nestjs/common';
import {UserService} from './user.service';
import {Resource, Service} from "@enums";
import {BaseController} from "../base/base.controller";
import {User} from "./entities/user.entity";

@Controller(Resource.User)
export class UserController extends BaseController<User>(User, Service.Users) {
  constructor(@Inject(Service.Users) private readonly usersService: UserService) {
    super(usersService)
  }
}
