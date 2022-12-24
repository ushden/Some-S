import { Injectable } from '@nestjs/common';
import {User} from "./entities/user.entity";
import {BaseService, IBaseService} from "../base/base.service";

export interface IUserService extends IBaseService<User> {}
@Injectable()
export class UserService extends BaseService<User>(User) implements IUserService{
  constructor() {
    super()
  }
}
