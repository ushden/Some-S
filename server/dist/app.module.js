"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const common_utils_1 = require("./common/utils/common-utils");
const nest_winston_1 = require("nest-winston");
const winston = require("winston");
const sequelize_1 = require("@nestjs/sequelize");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./user/user.module");
const process = require("process");
const _enums_1 = require("./common/enums");
const role_module_1 = require("./role/role.module");
const role_mapping_module_1 = require("./role-mapping/role-mapping.module");
const event_module_1 = require("./event/event.module");
const service_module_1 = require("./service/service.module");
const auth_module_1 = require("./auth/auth.module");
const access_token_module_1 = require("./access-token/access-token.module");
const telegram_module_1 = require("./telergam/telegram.module");
const notification_module_1 = require("./notification/notification.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: common_utils_1.CommonUtilsService.isLocalEnvironment(process.env.NODE_ENV) ? ['.env.local', '.env'] : ['.env'],
                isGlobal: true,
                expandVariables: true,
                cache: true,
            }),
            sequelize_1.SequelizeModule.forRoot({
                dialect: 'postgres',
                host: process.env.DB_HOST,
                port: Number(process.env.DB_PORT),
                username: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE_NAME,
                autoLoadModels: true,
                query: { nest: true },
                timezone: 'utc',
            }),
            nest_winston_1.WinstonModule.forRootAsync({
                useFactory: () => ({
                    transports: [
                        new winston.transports.Console({
                            format: winston.format.combine(winston.format.timestamp(), nest_winston_1.utilities.format.nestLike()),
                        }),
                    ],
                }),
                inject: [config_1.ConfigService],
            }),
            user_module_1.UserModule,
            role_module_1.RoleModule,
            role_mapping_module_1.RoleMappingModule,
            event_module_1.EventModule,
            service_module_1.ServiceModule,
            auth_module_1.AuthModule,
            access_token_module_1.AccessTokenModule,
            telegram_module_1.TelegramModule,
            notification_module_1.NotificationModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            {
                provide: _enums_1.Service.App,
                useClass: app_service_1.AppService,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map