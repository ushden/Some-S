import { IBaseService } from "../base/base.service";
import { Role } from "./entities/role.entity";
import { HighestRole } from "@enums";
export interface IRoleService extends IBaseService<Role> {
    getRoleByName: (name: HighestRole) => Promise<Role>;
}
declare const RoleService_base: import("@nestjs/common").Type<IBaseService<Role>>;
export declare class RoleService extends RoleService_base implements IRoleService {
    getRoleByName(name: HighestRole): Promise<Role>;
}
export {};
