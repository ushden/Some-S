import { Filterable, Identifier } from "sequelize";
export interface ICommonUtilsService {
}
export declare class CommonUtilsService implements ICommonUtilsService {
    static isLocalEnvironment(environment: string): boolean;
    static concatIdWithOptions<T extends Filterable>(id: Identifier, { where, ...rest }: T): T;
    static isEmptyObject(obj?: object): boolean;
    static compareTwoValues(firstValue: unknown, secondValue: unknown): boolean;
    static convertValueToString(value: unknown): string;
    static parseJsonString(jsonString: unknown): any;
}
