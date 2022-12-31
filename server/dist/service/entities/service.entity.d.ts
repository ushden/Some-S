import { Model } from 'sequelize-typescript';
export declare class Service extends Model<Service> {
    id: number;
    name: string;
    leadTime: number;
    price: number;
}
