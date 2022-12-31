import { UserService } from './user.service';
import { User } from "./entities/user.entity";
declare const UserController_base: import("@nestjs/common").Type<import("../base/base.controller").IBaseController<User>>;
export declare class UserController extends UserController_base {
    private readonly usersService;
    constructor(usersService: UserService);
    getMasters(): Promise<any[] | User[]>;
}
export {};
