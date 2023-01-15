import {Injectable} from '@nestjs/common';
import {BaseService, IBaseService} from "../base/base.service";
import {Role} from "./entities/role.entity";
import {HighestRole} from "@enums";

export interface IRoleService extends IBaseService<Role>{
	getRoleByName: (name: HighestRole) => Promise<Role>,
}

@Injectable()
export class RoleService extends BaseService<Role>(Role) implements IRoleService {
	async getRoleByName(name: HighestRole) {
		return await this.findOne({where: {name}});
	}
}
