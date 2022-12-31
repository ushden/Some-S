import {Injectable} from '@nestjs/common';
import {BaseService, IBaseService} from "../base/base.service";
import {Role} from "./entities/role.entity";

export interface IRoleService extends IBaseService<Role>{}

@Injectable()
export class RoleService extends BaseService<Role>(Role) implements IRoleService {

}
