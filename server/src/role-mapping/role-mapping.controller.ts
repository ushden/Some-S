import {Controller, Inject} from '@nestjs/common';
import {RoleMappingService} from './role-mapping.service';
import {Resource, Service} from "@enums";
import {BaseController} from "../base/base.controller";
import {RoleMapping} from "./entities/role-mapping.entity";

@Controller(Resource.RoleMapping)
export class RoleMappingController extends BaseController<RoleMapping>(RoleMapping, Service.RolesMapping){
  constructor(@Inject(Service.RolesMapping) private readonly roleMappingService: RoleMappingService) {
    super(roleMappingService)
  }
}
