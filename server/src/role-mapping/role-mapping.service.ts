import { Injectable } from '@nestjs/common';
import {BaseService, IBaseService} from "../base/base.service";
import {RoleMapping} from "./entities/role-mapping.entity";

interface IRoleMappingService extends IBaseService<RoleMapping>{}

@Injectable()
export class RoleMappingService extends BaseService<RoleMapping>(RoleMapping) implements IRoleMappingService {
  constructor() {
    super();
  }
}
