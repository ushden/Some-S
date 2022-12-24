import {Controller, Inject} from '@nestjs/common';
import {RoleService} from './role.service';
import {Resource, Service} from "@enums";
import {BaseController} from "../base/base.controller";
import {Role} from './entities/role.entity';

@Controller(Resource.Role)
export class RoleController extends BaseController<Role>(Role, Service.Roles) {
  constructor(@Inject(Service.Roles) private readonly roleService: RoleService) {
    super(roleService)
  }
}
