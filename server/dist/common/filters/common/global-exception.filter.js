"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const nest_winston_1 = require("nest-winston");
const winston_1 = require("winston");
let GlobalExceptionFilter = class GlobalExceptionFilter {
    constructor(logger, httpAdapterHost) {
        this.logger = logger;
        this.httpAdapterHost = httpAdapterHost;
    }
    catch(exception, host) {
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();
        const { name, stack } = exception;
        const { message } = exception instanceof common_1.HttpException ?
            exception.getResponse() :
            exception;
        const statusCode = exception instanceof common_1.HttpException ?
            exception.getStatus() :
            common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const error = statusCode === common_1.HttpStatus.UNPROCESSABLE_ENTITY ?
            { statusCode, message, name } :
            { statusCode, message, name, stack };
        this.logger.error(stack);
        this.logger.error(Array.isArray(message) ? message.join(', ') : message);
        httpAdapter.reply(ctx.getResponse(), { error }, statusCode);
    }
};
GlobalExceptionFilter = __decorate([
    (0, common_1.Catch)(),
    __param(0, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __param(1, (0, common_1.Inject)(core_1.HttpAdapterHost)),
    __metadata("design:paramtypes", [winston_1.Logger,
        core_1.HttpAdapterHost])
], GlobalExceptionFilter);
exports.GlobalExceptionFilter = GlobalExceptionFilter;
//# sourceMappingURL=global-exception.filter.js.map