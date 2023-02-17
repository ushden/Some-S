import { Model } from "sequelize-typescript";
import { Status } from "@enums";
import { User } from "../../user/entities/user.entity";
interface IService {
    id: number;
    name: string;
    price: number;
    leadTime: number;
}
export declare class Event extends Model<Event> {
    id: number;
    status: Status;
    start: number;
    end: number;
    created: number;
    price: number;
    leadTime: number;
    services: Array<IService>;
    customerId: number;
    masterId: number;
    meta: object;
    customer: User;
    master: User;
}
export {};
