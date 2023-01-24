import { Model } from "sequelize-typescript";
export declare class AccessToken extends Model<AccessToken> {
    id: string;
    userId: number;
    ttl: number;
}
