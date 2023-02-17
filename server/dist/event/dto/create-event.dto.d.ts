import { Status } from "@enums";
interface IService {
    id: number;
    name: string;
    price: number;
    leadTime: number;
}
export declare class CreateEventDto {
    readonly services: Array<IService>;
    readonly start: number;
    readonly end: number;
    readonly created: number;
    readonly status: Status;
    readonly customerId: number;
    readonly masterId: number;
    readonly leadTime: number;
    readonly price: number;
}
export {};
