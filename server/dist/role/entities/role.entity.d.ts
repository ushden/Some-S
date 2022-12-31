import { Model } from "sequelize-typescript";
import { User } from "../../user/entities/user.entity";
export declare class Role extends Model<Role> {
    id: number;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    users: User[];
}
