import {ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Inject} from '@nestjs/common';
import {HttpAdapterHost} from '@nestjs/core';
import {WINSTON_MODULE_PROVIDER} from 'nest-winston';
import {Logger} from 'winston';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    @Inject(HttpAdapterHost) private readonly httpAdapterHost: HttpAdapterHost,
  ) {}

  public catch(exception: Error | HttpException, host: ArgumentsHost): void {
    const {httpAdapter} = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const {name, stack} = exception;

    const {message} =
      exception instanceof HttpException ?
        exception.getResponse() as Error :
        exception;

    const statusCode =
      exception instanceof HttpException ?
        exception.getStatus() :
        HttpStatus.INTERNAL_SERVER_ERROR;

    const error =
      statusCode === HttpStatus.UNPROCESSABLE_ENTITY ?
        {statusCode, message, name} :
        {statusCode, message, name, stack};

    this.logger.error(stack);
    httpAdapter.reply(ctx.getResponse(), {error}, statusCode);
  }
}
