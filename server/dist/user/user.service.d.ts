import { User } from "./entities/user.entity";
import { IBaseService } from "../base/base.service";
import { IRoleService } from "../role/role.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { IRoleMappingService } from "../role-mapping/role-mapping.service";
export interface IUserService extends IBaseService<User> {
    getMasters: () => Promise<{
        rows: User[];
    }>;
    createCustomer: (user: CreateUserDto) => Promise<User>;
    checkIfExist: (phone: string) => Promise<boolean>;
    updateTelegramChatId: (id: number, chatId: string | number) => Promise<User>;
}
declare const UserService_base: import("@nestjs/common").Type<IBaseService<User>>;
export declare class UserService extends UserService_base implements IUserService {
    private readonly roleService;
    private readonly roleMappingService;
    constructor(roleService: IRoleService, roleMappingService: IRoleMappingService);
    getMasters(): Promise<{
        rows: any[] | User[];
    }>;
    createCustomer(userDto: CreateUserDto): Promise<User>;
    checkIfExist(phone: string): Promise<boolean>;
    updateTelegramChatId(id: number, chatId: string): Promise<User>;
}
export {};
