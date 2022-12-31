declare enum RequestQuerySource {
    Body = "body",
    Query = "query",
    Plain = "plain"
}
declare enum RequestQuerySubSource {
    Where = "where",
    Filter = "filter"
}
declare enum MetadataKey {
    Policy = "policy",
    ExcludeFields = "excludeFields",
    ContextFields = "contextFields",
    ContentTypes = "contentTypes",
    Wrapper = "wrapper",
    JsonFields = "jsonFields",
    MaxLimit = "maxLimit",
    QueryProcessingOptions = "queryProcessingOptions",
    QueryOptions = "queryOptions"
}
declare enum Order {
    Asc = "ASC",
    Desc = "DESC"
}
export { RequestQuerySource, RequestQuerySubSource, MetadataKey, Order, };
