import { ExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Logger } from 'winston';
export declare class GlobalExceptionFilter implements ExceptionFilter {
    private readonly logger;
    private readonly httpAdapterHost;
    constructor(logger: Logger, httpAdapterHost: HttpAdapterHost);
    catch(exception: Error | HttpException, host: ArgumentsHost): void;
}
