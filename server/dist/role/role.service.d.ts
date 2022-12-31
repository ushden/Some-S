import { IBaseService } from "../base/base.service";
import { Role } from "./entities/role.entity";
export interface IRoleService extends IBaseService<Role> {
}
declare const RoleService_base: import("@nestjs/common").Type<IBaseService<Role>>;
export declare class RoleService extends RoleService_base implements IRoleService {
}
export {};
