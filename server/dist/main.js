"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nest_winston_1 = require("nest-winston");
const compression = require("compression");
const nocache = require("nocache");
const helmet_1 = require("helmet");
const app_module_1 = require("./app.module");
const _filters_1 = require("./common/filters");
const _enums_1 = require("./common/enums");
const common_utils_1 = require("./common/utils/common-utils");
const bootstrap = async () => {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        bufferLogs: true,
    });
    const configService = app.get(config_1.ConfigService);
    const httpAdapterHost = app.get(core_1.HttpAdapterHost);
    const nodeEnvironment = configService.get('NODE_ENV');
    const apiPrefix = `api/v${configService.get('API_VERSION')}`;
    const isLocalhost = common_utils_1.CommonUtilsService.isLocalEnvironment(nodeEnvironment);
    const port = configService.get('PORT');
    const globalPrefix = `backend/${apiPrefix}`;
    const logger = app.get(nest_winston_1.WINSTON_MODULE_PROVIDER);
    const winston = app.get(nest_winston_1.WINSTON_MODULE_NEST_PROVIDER);
    app.enableCors({
        origin: true,
        credentials: true,
        exposedHeaders: [],
        maxAge: 86400,
    });
    app.set('trust proxy', ['linklocal', 'uniquelocal']);
    app.setGlobalPrefix(globalPrefix);
    app.useLogger(winston);
    app.useGlobalFilters(new _filters_1.GlobalExceptionFilter(logger, httpAdapterHost));
    app.useGlobalPipes(new common_1.ValidationPipe({
        errorHttpStatusCode: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
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
    app.use((0, helmet_1.default)({
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
        let baseUrl = _enums_1.ServerBaseUrls.default;
        if (!isLocalhost) {
            baseUrl = _enums_1.ServerBaseUrls[nodeEnvironment];
        }
        logger.info(`APPS001: Server listening at: ${baseUrl}/${globalPrefix}`);
    });
};
void bootstrap();
//# sourceMappingURL=main.js.map