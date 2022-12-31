import { RoleMappingService } from './role-mapping.service';
import { RoleMapping } from "./entities/role-mapping.entity";
declare const RoleMappingController_base: import("@nestjs/common").Type<import("../base/base.controller").IBaseController<RoleMapping>>;
export declare class RoleMappingController extends RoleMappingController_base {
    private readonly roleMappingService;
    constructor(roleMappingService: RoleMappingService);
}
export {};
