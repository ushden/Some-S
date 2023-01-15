import { User } from "./entities/user.entity";
import { IBaseService } from "../base/base.service";
import { IRoleService } from "../role/role.service";
export interface IUserService extends IBaseService<User> {
    getMasters: () => Promise<{
        rows: User[];
    }>;
}
declare const UserService_base: import("@nestjs/common").Type<IBaseService<User>>;
export declare class UserService extends UserService_base implements IUserService {
    private readonly roleService;
    constructor(roleService: IRoleService);
    getMasters(): Promise<{
        rows: any[] | User[];
    }>;
}
export {};
