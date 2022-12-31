import { Model } from "sequelize-typescript";
import { User } from "../../user/entities/user.entity";
export declare class Event extends Model<Event> {
    id: number;
    status: string;
    start: number;
    end: number;
    created: number;
    customerId: number;
    masterId: number;
    meta: object;
    customer: User;
    master: User;
}
