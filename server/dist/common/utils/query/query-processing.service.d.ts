import type { Request } from 'express';
import { INotProcessedQueryScope, IProcessedQuery, IQueryProcessingOptions } from '@interfaces';
export interface IQueryProcessingService {
}
export declare class QueryProcessingService implements IQueryProcessingService {
    static getNotProcessedQuery(request: Request<unknown, unknown, unknown>, { source, subSource }: IQueryProcessingOptions): INotProcessedQueryScope;
    static processRequestQuery(request: Request, queryProcessingOptions: IQueryProcessingOptions): IProcessedQuery;
    private static processQueryScope;
    private static processQueryScopeWhere;
    private static queryProcessingOperatorConverter;
    private static queryProcessingOperatorReviver;
    private static processQueryScopeIncludes;
    private static processQueryScopeInclude;
    private static processQueryScopeFields;
    private static processQueryScopeObjectOfFields;
    private static processQueryScopeOrder;
}
