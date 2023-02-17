import {BadRequestException, Inject, Injectable} from '@nestjs/common';
import {User} from "./entities/user.entity";
import {BaseService, IBaseService} from "../base/base.service";
import {HighestRole, Service} from "@enums";
import {IRoleService} from "../role/role.service";
import {get} from "lodash";
import {CreateUserDto} from "./dto/create-user.dto";
import {IRoleMappingService} from "../role-mapping/role-mapping.service";
import {CommonUtilsService} from "@utils/common-utils";

export interface IUserService extends IBaseService<User> {
  getMasters: () => Promise<{rows: User[]}>,
  getAdmins: () => Promise<User[]>,
  createCustomer: (user: CreateUserDto) => Promise<User>,
  checkIfExist: (phone: string) => Promise<boolean>,
  updateTelegramChatId: (id: number, chatId: string | number) => Promise<User>,
}

@Injectable()
export class UserService extends BaseService<User>(User) implements IUserService{
  constructor(
    @Inject(Service.Roles) private readonly roleService: IRoleService,
    @Inject(Service.RolesMapping) private readonly roleMappingService: IRoleMappingService,
  ) {
    super();
  }
  
  public async getAdmins() {
    try {
      const roles = await this.roleService.find({
        where: {name: HighestRole.Admin},
        include: ['users'],
      });
      
      return get(roles[0], 'users', []);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  public async getMasters() {
    try {
      const roles = await this.roleService.find({
        where: {name: HighestRole.Master},
        include: ['users'],
      });
  
      return {
        rows: get(roles[0], 'users', []),
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  
  async createCustomer(userDto: CreateUserDto): Promise<User> {
    const {name, phone} = userDto;
    const updatedPhone = CommonUtilsService.transformPhone(phone);
    
    try {
      const user = await this.create({name, phone: updatedPhone});
      const role = await this.roleService.getRoleByName(HighestRole.Customer);
  
      await this.roleMappingService.create({roleId: role.id, userId: user.id});
      user.roles = [role];
  
      return user;
    } catch (e) {
     throw new BadRequestException();
    }
  }
  
  async checkIfExist(phone: string) {
    const updatedPhone = CommonUtilsService.transformPhone(phone);
    
    try {
      const count = await this.count({where: {phone: updatedPhone}});
      
      return !!count;
    } catch (e) {
      throw new BadRequestException();
    }
  }
  
  public async updateTelegramChatId(id: number, chatId: string) {
    const [, user] = await this.update({telegramChatId: chatId}, {where: {id}});
    
    return user[0];
  }
}
