import { IRoleService } from './role.service';
import { Role } from './entities/role.entity';
declare const RoleController_base: import("@nestjs/common").Type<import("../base/base.controller").IBaseController<Role>>;
export declare class RoleController extends RoleController_base {
    private readonly roleService;
    constructor(roleService: IRoleService);
}
export {};
