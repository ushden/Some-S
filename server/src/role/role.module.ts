import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Role} from "./entities/role.entity";
import {User} from "../users/entities/user.entity";
import {RoleMapping} from "../role-mapping/entities/role-mapping.entity";
import {Service} from "@enums";

@Module({
  imports: [
    SequelizeModule.forFeature([Role]),
    User,
    RoleMapping,
  ],
  controllers: [RoleController],
  providers: [{
    provide: Service.Roles,
    useValue: RoleService
  }],
  exports: [Service.Roles]
})
export class RoleModule {}
