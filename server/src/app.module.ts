import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {CommonUtilsService} from '@utils/common-utils';
import {WinstonModule, utilities as nestWinstonModuleUtilities} from 'nest-winston';
import * as winston from 'winston';
import {SequelizeModule} from '@nestjs/sequelize';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from './user/user.module';
import * as process from 'process';
import {Service} from '@enums';
import {RoleModule} from './role/role.module';
import {RoleMappingModule} from './role-mapping/role-mapping.module';
import {EventModule} from './event/event.module';
import {ServiceModule} from './service/service.module';
import {AuthModule} from './auth/auth.module';
import {AccessTokenModule} from './access-token/access-token.module';
import {TelegramModule} from './telergam/telegram.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: CommonUtilsService.isLocalEnvironment(process.env.NODE_ENV) ? ['.env.local', '.env'] : ['.env'],
      isGlobal: true,
      expandVariables: true,
      cache: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE_NAME,
      autoLoadModels: true,
      query: {nest: true},
      timezone: 'utc',
    }),
    WinstonModule.forRootAsync({
      useFactory: () => ({
        transports: [
          new winston.transports.Console({
            format: winston.format.combine(winston.format.timestamp(), nestWinstonModuleUtilities.format.nestLike()),
          }),
        ],
      }),
      inject: [ConfigService],
    }),
    UserModule,
    RoleModule,
    RoleMappingModule,
    EventModule,
    ServiceModule,
    AuthModule,
    AccessTokenModule,
    TelegramModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: Service.App,
      useClass: AppService,
    },
  ],
})
export class AppModule {}
