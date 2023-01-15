import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {Service} from '@enums';
import {JwtModule, JwtService} from '@nestjs/jwt';
import {UserModule} from '../user/user.module';
import {RoleMappingModule} from "../role-mapping/role-mapping.module";
import {RoleModule} from "../role/role.module";
import {AccessTokenModule} from "../access-token/access-token.module";

@Module({
  providers: [
    {
      provide: Service.Auth,
      useClass: AuthService,
    },
    {
      provide: Service.JWT,
      useClass: JwtService,
    },
  ],
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY || 'SECRET',
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN || '30d',
      },
    }),
    UserModule,
    RoleMappingModule,
    RoleModule,
    AccessTokenModule,
  ],
  exports: [Service.Auth],
})
export class AuthModule {}
