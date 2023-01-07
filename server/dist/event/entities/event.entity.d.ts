import { Model } from "sequelize-typescript";
import { User } from "../../user/entities/user.entity";
interface IService {
    id: number;
    name: string;
    price: number;
    leadTime: number;
}
export declare class Event extends Model<Event> {
    id: number;
    status: string;
    start: number;
    end: number;
    created: number;
    price: number;
    services: Array<IService>;
    customerId: number;
    masterId: number;
    meta: object;
    customer: User;
    master: User;
}
export {};
