import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Role} from "./entities/role.entity";
import {Service} from "@enums";

@Module({
  imports: [
    SequelizeModule.forFeature([Role]),
  ],
  controllers: [RoleController],
  providers: [{
    provide: Service.Roles,
    useClass: RoleService
  }],
  exports: [Service.Roles]
})
export class RoleModule {}
