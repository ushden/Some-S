import {Injectable} from '@nestjs/common';
import {WhereOptions} from 'sequelize';
import type {Request} from 'express';
import {isEmpty, isNumber, isArray, isString, keys} from 'lodash';

import {INotProcessedQueryScope, IProcessedQuery, IProcessedQueryScope, IQueryProcessingOptions} from '@interfaces';
import {RequestQuerySource, RequestQuerySubSource} from '@enums';
import {queryOperatorMapping} from '@constants';
import type {
  NotProcessedFields,
  NotProcessedInclude,
  NotProcessedWhere,
  NotProcessedOrder,
  ProcessedInclude,
  ProcessedOrder,
  ProcessedAttributes,
} from '@types';
import {CommonUtilsService} from '@utils/common-utils';

export interface IQueryProcessingService {}

@Injectable()
export class QueryProcessingService implements IQueryProcessingService {
  public static getNotProcessedQuery( // TODO: Fix assertions
    request: Request<unknown, unknown, unknown>,
    {source, subSource}: IQueryProcessingOptions,
  ): INotProcessedQueryScope {
    let notProcessedQuery: INotProcessedQueryScope | NotProcessedWhere = subSource ?
      request[source][subSource] :
      request[source];
    if (isEmpty(notProcessedQuery)) {
      return null;
    }

    if (source === RequestQuerySource.Query) {
      notProcessedQuery = CommonUtilsService.parseJsonString(notProcessedQuery);
    }

    if (subSource === RequestQuerySubSource.Where) {
      return {where: notProcessedQuery as NotProcessedWhere};
    }

    return notProcessedQuery as INotProcessedQueryScope;
  }

  public static processRequestQuery(
    request: Request,
    queryProcessingOptions: IQueryProcessingOptions,
  ): IProcessedQuery {
    const notProcessedQuery = QueryProcessingService.getNotProcessedQuery(request, queryProcessingOptions);
    if (!notProcessedQuery) {
      return {};
    }

    const processedQuery = QueryProcessingService.processQueryScope(notProcessedQuery);
    return {...processedQuery, nest: true};
  }

  private static processQueryScope(notProcessedQueryScope: INotProcessedQueryScope): IProcessedQueryScope {
    const {
      where: notProcessedQueryScopeWhere,
      include: notProcessedQueryScopeInclude,
      fields: notProcessedQueryScopeFields,
      order: notProcessedQueryScopeOrder,
      skip, limit,
    } = notProcessedQueryScope; // TODO: Add validation

    const processedQueryScope: IProcessedQueryScope = {};
    if (!isEmpty(notProcessedQueryScopeWhere)) {
      processedQueryScope.where = QueryProcessingService.processQueryScopeWhere(notProcessedQueryScopeWhere);
    }

    if (!isEmpty(notProcessedQueryScopeInclude)) {
      processedQueryScope.include = QueryProcessingService.processQueryScopeIncludes(notProcessedQueryScopeInclude);
    }

    if (!isEmpty(notProcessedQueryScopeFields)) {
      processedQueryScope.attributes = QueryProcessingService.processQueryScopeFields(notProcessedQueryScopeFields);
    }

    if (!isEmpty(notProcessedQueryScopeOrder)) {
      processedQueryScope.order = QueryProcessingService.processQueryScopeOrder(notProcessedQueryScopeOrder);
    }

    if (isNumber(skip)) {
      processedQueryScope.offset = skip;
    }

    if (isNumber(limit)) {
      processedQueryScope.limit = limit;
    }

    return processedQueryScope;
  }

  private static processQueryScopeWhere(notProcessedWhere: NotProcessedWhere): WhereOptions {
    return QueryProcessingService.queryProcessingOperatorConverter(notProcessedWhere);
  }

  private static queryProcessingOperatorConverter(queryWhere: NotProcessedWhere): WhereOptions {
    return JSON.parse(
      JSON.stringify(queryWhere),
      QueryProcessingService.queryProcessingOperatorReviver,
    ) as WhereOptions;
  }

  private static queryProcessingOperatorReviver(this: unknown, key: string, value: unknown): unknown {
    if (key in queryOperatorMapping) {
      const symbol = queryOperatorMapping[key];
      this[symbol] = value;
      return;
    }

    return value;
  }

  private static processQueryScopeIncludes(
    notProcessedQueryScopeInclude: NotProcessedInclude | NotProcessedInclude[],
  ): ProcessedInclude[] {
    if (isArray(notProcessedQueryScopeInclude)) {
      return notProcessedQueryScopeInclude.map(include => QueryProcessingService.processQueryScopeInclude(include));
    }

    return [QueryProcessingService.processQueryScopeInclude(notProcessedQueryScopeInclude)];
  }

  private static processQueryScopeInclude(notProcessedQueryScopeInclude: NotProcessedInclude): ProcessedInclude {
    if (isString(notProcessedQueryScopeInclude)) {
      return notProcessedQueryScopeInclude;
    }

    const {relation, scope, ...restIncludeOptions} = notProcessedQueryScopeInclude;
    if (!scope) {
      return {association: relation, ...restIncludeOptions};
    }

    const processedQueryScopeInclude = QueryProcessingService.processQueryScope(scope);
    return {association: relation, ...restIncludeOptions, ...processedQueryScopeInclude};
  }

  private static processQueryScopeFields(notProcessedFields: NotProcessedFields): ProcessedAttributes {
    if (isArray(notProcessedFields)) {
      return notProcessedFields;
    }

    return QueryProcessingService.processQueryScopeObjectOfFields(notProcessedFields);
  }

  private static processQueryScopeObjectOfFields(notProcessedFields: Record<string, boolean>): ProcessedAttributes {
    const notProcessedFieldsToInclude = keys(notProcessedFields).filter(key => notProcessedFields[key]);
    const notProcessedFieldsToExclude = keys(notProcessedFields).filter(key => !notProcessedFields[key]);

    return {
      include: notProcessedFieldsToInclude,
      exclude: notProcessedFieldsToExclude,
    };
  }

  private static processQueryScopeOrder(notProcessedOrder: NotProcessedOrder | NotProcessedOrder[]): ProcessedOrder[] { // TODO: Fix assertions
    if (isArray(notProcessedOrder)) {
      return notProcessedOrder.map(orderItem => orderItem.split(' ') as ProcessedOrder);
    }

    return [notProcessedOrder.split(' ') as ProcessedOrder];
  }
}
