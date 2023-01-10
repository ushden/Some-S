import {Inject, Injectable} from '@nestjs/common';
import {User} from "./entities/user.entity";
import {BaseService, IBaseService} from "../base/base.service";
import {HighestRole, Service} from "@enums";
import {IRoleService} from "../role/role.service";
import {get} from "lodash";

export interface IUserService extends IBaseService<User> {
  getMasters: () => Promise<{rows: User[]}>
}

@Injectable()
export class UserService extends BaseService<User>(User) implements IUserService{
  constructor(@Inject(Service.Roles) private readonly roleService: IRoleService) {
    super();
  }

  async getMasters() {
    const roles = await this.roleService.find({
      where: {name: HighestRole.Master},
      include: ['users'],
    })

    return {
      rows: get(roles[0], 'users', []),
    };
  }
}
