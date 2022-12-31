"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var QueryProcessingService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryProcessingService = void 0;
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
const _enums_1 = require("../../enums");
const _constants_1 = require("../../constants");
const common_utils_1 = require("../common-utils");
let QueryProcessingService = QueryProcessingService_1 = class QueryProcessingService {
    static getNotProcessedQuery(request, { source, subSource }) {
        let notProcessedQuery = subSource ?
            request[source][subSource] :
            request[source];
        if ((0, lodash_1.isEmpty)(notProcessedQuery)) {
            return null;
        }
        if (source === _enums_1.RequestQuerySource.Query) {
            notProcessedQuery = common_utils_1.CommonUtilsService.parseJsonString(notProcessedQuery);
        }
        if (subSource === _enums_1.RequestQuerySubSource.Where) {
            return { where: notProcessedQuery };
        }
        return notProcessedQuery;
    }
    static processRequestQuery(request, queryProcessingOptions) {
        const notProcessedQuery = QueryProcessingService_1.getNotProcessedQuery(request, queryProcessingOptions);
        if (!notProcessedQuery) {
            return {};
        }
        const processedQuery = QueryProcessingService_1.processQueryScope(notProcessedQuery);
        return Object.assign(Object.assign({}, processedQuery), { nest: true });
    }
    static processQueryScope(notProcessedQueryScope) {
        const { where: notProcessedQueryScopeWhere, include: notProcessedQueryScopeInclude, fields: notProcessedQueryScopeFields, order: notProcessedQueryScopeOrder, skip, limit, } = notProcessedQueryScope;
        const processedQueryScope = {};
        if (!(0, lodash_1.isEmpty)(notProcessedQueryScopeWhere)) {
            processedQueryScope.where = QueryProcessingService_1.processQueryScopeWhere(notProcessedQueryScopeWhere);
        }
        if (!(0, lodash_1.isEmpty)(notProcessedQueryScopeInclude)) {
            processedQueryScope.include = QueryProcessingService_1.processQueryScopeIncludes(notProcessedQueryScopeInclude);
        }
        if (!(0, lodash_1.isEmpty)(notProcessedQueryScopeFields)) {
            processedQueryScope.attributes = QueryProcessingService_1.processQueryScopeFields(notProcessedQueryScopeFields);
        }
        if (!(0, lodash_1.isEmpty)(notProcessedQueryScopeOrder)) {
            processedQueryScope.order = QueryProcessingService_1.processQueryScopeOrder(notProcessedQueryScopeOrder);
        }
        if ((0, lodash_1.isNumber)(skip)) {
            processedQueryScope.offset = skip;
        }
        if ((0, lodash_1.isNumber)(limit)) {
            processedQueryScope.limit = limit;
        }
        return processedQueryScope;
    }
    static processQueryScopeWhere(notProcessedWhere) {
        return QueryProcessingService_1.queryProcessingOperatorConverter(notProcessedWhere);
    }
    static queryProcessingOperatorConverter(queryWhere) {
        return JSON.parse(JSON.stringify(queryWhere), QueryProcessingService_1.queryProcessingOperatorReviver);
    }
    static queryProcessingOperatorReviver(key, value) {
        if (key in _constants_1.queryOperatorMapping) {
            const symbol = _constants_1.queryOperatorMapping[key];
            this[symbol] = value;
            return;
        }
        return value;
    }
    static processQueryScopeIncludes(notProcessedQueryScopeInclude) {
        if ((0, lodash_1.isArray)(notProcessedQueryScopeInclude)) {
            return notProcessedQueryScopeInclude.map(include => QueryProcessingService_1.processQueryScopeInclude(include));
        }
        return [QueryProcessingService_1.processQueryScopeInclude(notProcessedQueryScopeInclude)];
    }
    static processQueryScopeInclude(notProcessedQueryScopeInclude) {
        if ((0, lodash_1.isString)(notProcessedQueryScopeInclude)) {
            return notProcessedQueryScopeInclude;
        }
        const { relation, scope } = notProcessedQueryScopeInclude, restIncludeOptions = __rest(notProcessedQueryScopeInclude, ["relation", "scope"]);
        if (!scope) {
            return Object.assign({ association: relation }, restIncludeOptions);
        }
        const processedQueryScopeInclude = QueryProcessingService_1.processQueryScope(scope);
        return Object.assign(Object.assign({ association: relation }, restIncludeOptions), processedQueryScopeInclude);
    }
    static processQueryScopeFields(notProcessedFields) {
        if ((0, lodash_1.isArray)(notProcessedFields)) {
            return notProcessedFields;
        }
        return QueryProcessingService_1.processQueryScopeObjectOfFields(notProcessedFields);
    }
    static processQueryScopeObjectOfFields(notProcessedFields) {
        const notProcessedFieldsToInclude = (0, lodash_1.keys)(notProcessedFields).filter(key => notProcessedFields[key]);
        const notProcessedFieldsToExclude = (0, lodash_1.keys)(notProcessedFields).filter(key => !notProcessedFields[key]);
        return {
            include: notProcessedFieldsToInclude,
            exclude: notProcessedFieldsToExclude,
        };
    }
    static processQueryScopeOrder(notProcessedOrder) {
        if ((0, lodash_1.isArray)(notProcessedOrder)) {
            return notProcessedOrder.map(orderItem => orderItem.split(' '));
        }
        return [notProcessedOrder.split(' ')];
    }
};
QueryProcessingService = QueryProcessingService_1 = __decorate([
    (0, common_1.Injectable)()
], QueryProcessingService);
exports.QueryProcessingService = QueryProcessingService;
//# sourceMappingURL=query-processing.service.js.map