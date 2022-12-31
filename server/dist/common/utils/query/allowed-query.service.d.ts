import { ExecutionContext } from '@nestjs/common';
import { IProcessedQuery } from '@interfaces';
import { RequestQuerySource } from '@enums';
export interface IAllowedQueryService {
}
export declare class AllowedQueryService implements IAllowedQueryService {
    static allowedQueryFactory({ source }: {
        source: RequestQuerySource;
    }, context: ExecutionContext): IProcessedQuery;
}
