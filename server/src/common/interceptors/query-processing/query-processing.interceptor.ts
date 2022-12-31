import {CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import type {Request} from 'express';
import {Observable} from 'rxjs';

import {IQueryProcessingOptions} from '@interfaces';
import {MetadataKey} from '@enums';
import {QueryProcessingService} from '@utils/query';

@Injectable()
export class QueryProcessingInterceptor<T> implements NestInterceptor {
  constructor(@Inject(Reflector) private readonly reflector: Reflector) {}

  public intercept(context: ExecutionContext, next: CallHandler<T>): Observable<T> {
    const request = context.switchToHttp().getRequest<Request>();
    const queryProcessingOptions = this.reflector.getAllAndOverride<IQueryProcessingOptions, MetadataKey>(
      MetadataKey.QueryProcessingOptions,
      [context.getHandler(), context.getClass()],
    );

    request[queryProcessingOptions.source] = QueryProcessingService
      .processRequestQuery(request, queryProcessingOptions);

    return next.handle();
  }
}
