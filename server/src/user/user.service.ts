import {BadRequestException, Inject, Injectable} from '@nestjs/common';
import {User} from "./entities/user.entity";
import {BaseService, IBaseService} from "../base/base.service";
import {HighestRole, Service} from "@enums";
import {IRoleService} from "../role/role.service";
import {get} from "lodash";
import {CreateUserDto} from "./dto/create-user.dto";
import {IRoleMappingService} from "../role-mapping/role-mapping.service";

export interface IUserService extends IBaseService<User> {
  getMasters: () => Promise<{rows: User[]}>,
  createCustomer: (user: CreateUserDto) => Promise<User>,
  checkIfExist: (phone: string) => Promise<boolean>,
}

@Injectable()
export class UserService extends BaseService<User>(User) implements IUserService{
  constructor(
    @Inject(Service.Roles) private readonly roleService: IRoleService,
    @Inject(Service.RolesMapping) private readonly roleMappingService: IRoleMappingService,
  ) {
    super();
  }

  async getMasters() {
    try {
      const roles = await this.roleService.find({
        where: {name: HighestRole.Master},
        include: ['users'],
      })
  
      return {
        rows: get(roles[0], 'users', []),
      };
    } catch (e) {
      throw new BadRequestException();
    }
  }
  
  async createCustomer(userDto: CreateUserDto): Promise<User> {
    try {
      const user = await this.create(userDto);
      const role = await this.roleService.getRoleByName(HighestRole.Customer);
  
      await this.roleMappingService.create({roleId: role.id, userId: user.id});
      user.roles = [role];
  
      return user;
    } catch (e) {
     throw new BadRequestException();
    }
  }
  
  async checkIfExist(phone: string) {
    try {
      const count = await this.count({where: {phone}});
      
      return !!count;
    } catch (e) {
      throw new BadRequestException();
    }
  }
}
