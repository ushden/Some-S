"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = exports.MetadataKey = exports.RequestQuerySubSource = exports.RequestQuerySource = void 0;
var RequestQuerySource;
(function (RequestQuerySource) {
    RequestQuerySource["Body"] = "body";
    RequestQuerySource["Query"] = "query";
    RequestQuerySource["Plain"] = "plain";
})(RequestQuerySource || (RequestQuerySource = {}));
exports.RequestQuerySource = RequestQuerySource;
var RequestQuerySubSource;
(function (RequestQuerySubSource) {
    RequestQuerySubSource["Where"] = "where";
    RequestQuerySubSource["Filter"] = "filter";
})(RequestQuerySubSource || (RequestQuerySubSource = {}));
exports.RequestQuerySubSource = RequestQuerySubSource;
var MetadataKey;
(function (MetadataKey) {
    MetadataKey["Policy"] = "policy";
    MetadataKey["ExcludeFields"] = "excludeFields";
    MetadataKey["ContextFields"] = "contextFields";
    MetadataKey["ContentTypes"] = "contentTypes";
    MetadataKey["Wrapper"] = "wrapper";
    MetadataKey["JsonFields"] = "jsonFields";
    MetadataKey["MaxLimit"] = "maxLimit";
    MetadataKey["QueryProcessingOptions"] = "queryProcessingOptions";
    MetadataKey["QueryOptions"] = "queryOptions";
})(MetadataKey || (MetadataKey = {}));
exports.MetadataKey = MetadataKey;
var Order;
(function (Order) {
    Order["Asc"] = "ASC";
    Order["Desc"] = "DESC";
})(Order || (Order = {}));
exports.Order = Order;
//# sourceMappingURL=index.js.map