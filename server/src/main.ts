import {HttpAdapterHost, NestFactory} from '@nestjs/core';
import {NestExpressApplication} from "@nestjs/platform-express";
import {HttpStatus, LoggerService, ValidationPipe} from "@nestjs/common";
import {ConfigService} from '@nestjs/config';
import {WINSTON_MODULE_NEST_PROVIDER, WINSTON_MODULE_PROVIDER} from 'nest-winston';
import {Logger} from "winston";
import * as compression from 'compression';
import * as nocache from 'nocache';
import helmet from 'helmet';

import {AppModule} from './app.module';
import {GlobalExceptionFilter} from "@filters";
import {ServerBaseUrls} from "@enums";
import {CommonUtilsService} from "@utils/common-utils";

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  const configService = app.get<ConfigService>(ConfigService);
  const httpAdapterHost = app.get<HttpAdapterHost>(HttpAdapterHost);
  const nodeEnvironment = configService.get<string>('NODE_ENV');
  const apiPrefix = `api/v${configService.get<number>('API_VERSION')}`;
  const isLocalhost = CommonUtilsService.isLocalEnvironment(nodeEnvironment);

  const port = configService.get<number>('PORT');
  const globalPrefix = `backend/${apiPrefix}`;
  const logger = app.get<Logger>(WINSTON_MODULE_PROVIDER);
  const winston = app.get<LoggerService>(WINSTON_MODULE_NEST_PROVIDER);

  app.set('trust proxy', ['linklocal', 'uniquelocal']);
  app.setGlobalPrefix(globalPrefix);
  app.useLogger(winston);
  app.useGlobalFilters(new GlobalExceptionFilter(logger, httpAdapterHost));
  app.useGlobalPipes(new ValidationPipe({
    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    transform: true,
    validateCustomDecorators: true,
    always: true,
    transformOptions: {
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
      exposeDefaultValues: true,
    },
  }));
  app.use(compression());
  app.use(nocache());
  app.use(helmet({
    xssFilter: true,
    frameguard: {
      action: 'deny',
    },
    hsts: {
      maxAge: 0,
      includeSubDomains: true,
    },
    hidePoweredBy: true,
    ieNoOpen: true,
    noSniff: true,
  }));

  await app.listen(port, () => {
    let baseUrl = ServerBaseUrls.default;
    if (!isLocalhost) {
      baseUrl = ServerBaseUrls[nodeEnvironment];
    }

    logger.info(`APPS001: Server listening at: ${baseUrl}/${globalPrefix}`);
  });
};

void bootstrap();