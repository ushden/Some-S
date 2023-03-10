import {Injectable} from "@nestjs/common";

import {Env} from '@enums';
import {Filterable, Identifier, Op} from "sequelize";
import {stringify} from "ts-jest";

export interface ICommonUtilsService {}

@Injectable()
export class CommonUtilsService implements ICommonUtilsService {
  public static isLocalEnvironment(environment: string): boolean {
    return ![Env.Prod].includes(environment as Env);
  }
  
  public static transformPhone(phone: string) {
    if (phone.length === 10) {
      phone = `+38${phone}`;
    }
  
    if (phone.length === 13 && phone.startsWith('380')) {
      phone = `+${phone}`;
    }
    
    return phone;
  }

  public static concatIdWithOptions<T extends Filterable>(id: Identifier, {where, ...rest}: T): T { // TODO: Fix assertion
    if (CommonUtilsService.isEmptyObject(where)) {
      return {where: {id}, ...rest} as unknown as T;
    }

    return {where: {id, [Op.and]: where}, ...rest} as unknown as T;
  }

  public static isEmptyObject(obj: object = {}): boolean {
    return (
      Object.getPrototypeOf(obj) === Object.prototype &&
      Object.getOwnPropertyNames(obj).length === 0 &&
      Object.getOwnPropertySymbols(obj).length === 0
    );
  }

  public static compareTwoValues(firstValue: unknown, secondValue: unknown): boolean {
    return CommonUtilsService.convertValueToString(firstValue) === CommonUtilsService.convertValueToString(secondValue);
  }

  public static convertValueToString(value: unknown): string {
    return typeof value === 'object' ? stringify(value) : value.toString();
  }

  public static parseJsonString(jsonString: unknown): any {
    if (typeof jsonString !== 'string') {
      return jsonString;
    }

    try {
      JSON.parse(jsonString);
    } catch (e) {
      return jsonString;
    }

    return JSON.parse(jsonString);
  }
}