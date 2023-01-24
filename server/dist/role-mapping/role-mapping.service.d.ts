import { IBaseService } from "../base/base.service";
import { RoleMapping } from "./entities/role-mapping.entity";
export interface IRoleMappingService extends IBaseService<RoleMapping> {
}
declare const RoleMappingService_base: import("@nestjs/common").Type<IBaseService<RoleMapping>>;
export declare class RoleMappingService extends RoleMappingService_base implements IRoleMappingService {
}
export {};
