import {Injectable} from "@nestjs/common";

import {Env} from '@enums';

export interface ICommonUtilsService {}

@Injectable()
export class CommonUtilsService implements ICommonUtilsService {
  public static isLocalEnvironment(environment: string): boolean {
    return ![Env.Prod].includes(environment as Env);
  }
}