import { NotProcessedFields, NotProcessedInclude, NotProcessedOrder, NotProcessedWhere, ProcessedAttributes, ProcessedInclude, ProcessedOrder, QuerySource } from "@types";
import { RequestQuerySubSource } from "@enums";
import { Filterable, FindOptions, QueryOptions } from "sequelize";
interface IQueryProcessingOptions {
    source: QuerySource;
    subSource?: RequestQuerySubSource;
}
interface INotProcessedQueryScope {
    where?: NotProcessedWhere;
    include?: NotProcessedInclude | NotProcessedInclude[];
    fields?: NotProcessedFields;
    order?: NotProcessedOrder | NotProcessedOrder[];
    skip?: number;
    limit?: number;
}
interface IProcessedQueryScope<T = unknown> extends Filterable<T>, Pick<FindOptions<T>, 'limit' | 'offset'> {
    attributes?: ProcessedAttributes;
    include?: ProcessedInclude[];
    order?: ProcessedOrder[];
}
interface IProcessedQuery<T = unknown> extends IProcessedQueryScope<T>, Pick<QueryOptions, 'nest'>, Pick<FindOptions<T>, 'subQuery'> {
}
export { IQueryProcessingOptions, INotProcessedQueryScope, IProcessedQuery, IProcessedQueryScope, };
