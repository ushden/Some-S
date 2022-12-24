import { Module } from '@nestjs/common';
import { RoleMappingService } from './role-mapping.service';
import { RoleMappingController } from './role-mapping.controller';
import {Service} from "@enums";
import {SequelizeModule} from "@nestjs/sequelize";
import {RoleMapping} from "./entities/role-mapping.entity";
import {User} from "../users/entities/user.entity";
import {Role} from "../role/entities/role.entity";

@Module({
  imports: [
    SequelizeModule.forFeature([RoleMapping]),
    User,
    Role,
  ],
  controllers: [RoleMappingController],
  providers: [{
    provide: Service.RolesMapping,
    useValue: RoleMappingService,
  }]
})
export class RoleMappingModule {}
