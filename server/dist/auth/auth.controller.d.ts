import { IAuthService } from "./auth.service";
import { CreateUserDto } from "../user/dto/create-user.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: IAuthService);
    login(user: CreateUserDto): Promise<import("../common/interfaces/query").IToken>;
}
