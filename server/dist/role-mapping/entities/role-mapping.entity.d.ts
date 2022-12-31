import { Model } from "sequelize-typescript";
export declare class RoleMapping extends Model<RoleMapping> {
    id: number;
    userId: number;
    roleId: number;
}
