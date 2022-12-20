import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {CommonUtilsService} from "@utils/common-utils";
import {WinstonModule, utilities as nestWinstonModuleUtilities} from 'nest-winston';
import * as winston from 'winston';
import {SequelizeModule} from '@nestjs/sequelize';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import * as process from "process";

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
      models: [],
      autoLoadModels: true,
    }),
    WinstonModule.forRootAsync({
      useFactory: () => ({
        transports: [
          new winston.transports.Console({
            format: winston.format.combine(
              winston.format.timestamp(),
              nestWinstonModuleUtilities.format.nestLike(),
            ),
          }),
        ],
      }),
      inject: [ConfigService],
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
