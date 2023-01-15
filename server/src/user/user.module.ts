import {Module} from '@nestjs/common';
import {UserService} from './user.service';
import {UserController} from './user.controller';
import {SequelizeModule} from '@nestjs/sequelize';
import {User} from './entities/user.entity';
import {Service} from '@enums';
import {RoleModule} from '../role/role.module';
import {RoleMappingModule} from '../role-mapping/role-mapping.module';
import {AccessTokenModule} from '../access-token/access-token.module';

@Module({
  imports: [SequelizeModule.forFeature([User]), RoleModule, RoleMappingModule, AccessTokenModule],
  controllers: [UserController],
  providers: [
    {
      provide: Service.Users,
      useClass: UserService,
    },
  ],
  exports: [Service.Users],
})
export class UserModule {}
