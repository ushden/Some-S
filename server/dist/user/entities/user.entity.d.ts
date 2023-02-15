import { Model } from "sequelize-typescript";
import { Role } from "../../role/entities/role.entity";
import { AccessToken } from "../../access-token/entities/access-token.entity";
export declare class User extends Model<User> {
    id: number;
    email: string;
    name: string;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
    verified: boolean;
    meta: object;
    telegramChatId: string;
    roles: Role[];
    token: AccessToken;
}
