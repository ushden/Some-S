import { Order, RequestQuerySource } from "@enums";
import { IncludeOptions } from "sequelize";
import { INotProcessedQueryScope } from "@interfaces";
type QuerySource = RequestQuerySource.Body | RequestQuerySource.Query;
type NotProcessedOrder = `${string} ${Order}`;
type NotProcessedWhere = Record<string, unknown>;
type NotProcessedFields = string[] | Record<string, boolean>;
type NotProcessedInclude = string | {
    relation: string;
    required?: boolean;
    scope?: INotProcessedQueryScope;
};
type ProcessedInclude = IncludeOptions | string;
type ProcessedOrder = [string, Order];
type ProcessedAttributesObject = {
    exclude?: string[];
    include: string[];
} | {
    exclude: string[];
    include?: string[];
};
type ProcessedAttributes = string[] | ProcessedAttributesObject;
export { QuerySource, NotProcessedOrder, NotProcessedWhere, NotProcessedInclude, NotProcessedFields, ProcessedAttributes, ProcessedAttributesObject, ProcessedOrder, ProcessedInclude, };
