import { Model } from "sequelize-typescript";
import { Role } from "../../role/entities/role.entity";
export declare class User extends Model<User> {
    id: number;
    email: string;
    name: string;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
    verified: boolean;
    meta: object;
    roles: Role[];
}
