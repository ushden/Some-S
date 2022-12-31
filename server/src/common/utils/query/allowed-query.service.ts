import {ExecutionContext, Injectable} from '@nestjs/common';
import type {Request} from 'express';

import {IProcessedQuery,} from '@interfaces';
import {RequestQuerySource} from '@enums';

export interface IAllowedQueryService {}

// todo add check query
@Injectable()
export class AllowedQueryService implements IAllowedQueryService {
  public static allowedQueryFactory(
    {source = RequestQuerySource.Plain}: {source: RequestQuerySource},
    context: ExecutionContext,
  ): IProcessedQuery {
    const request = context.switchToHttp().getRequest<Request>();

    return request[source];
  }
}
