"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllowedQuery = void 0;
const common_1 = require("@nestjs/common");
const query_1 = require("../../utils/query");
exports.AllowedQuery = (0, common_1.createParamDecorator)(query_1.AllowedQueryService.allowedQueryFactory);
//# sourceMappingURL=allowed-query.decorator.js.map