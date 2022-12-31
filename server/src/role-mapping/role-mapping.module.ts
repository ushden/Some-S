import { Module } from '@nestjs/common';
import { RoleMappingService } from './role-mapping.service';
import { RoleMappingController } from './role-mapping.controller';
import {Service} from "@enums";
import {SequelizeModule} from "@nestjs/sequelize";
import {RoleMapping} from "./entities/role-mapping.entity";

@Module({
  imports: [
    SequelizeModule.forFeature([RoleMapping]),
  ],
  controllers: [RoleMappingController],
  providers: [{
    provide: Service.RolesMapping,
    useClass: RoleMappingService,
  }]
})
export class RoleMappingModule {}
