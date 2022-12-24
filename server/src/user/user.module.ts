import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./entities/user.entity";
import {Role} from "../role/entities/role.entity";
import {Service} from "@enums";
import {RoleMapping} from "../role-mapping/entities/role-mapping.entity";

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    Role,
    RoleMapping,
  ],
  controllers: [UserController],
  providers: [{
    provide: Service.Users,
    useValue: UserService,
  }],
  exports: [Service.Users],
})
export class UserModule {}
