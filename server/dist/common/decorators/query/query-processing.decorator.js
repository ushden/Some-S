"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryProcessing = void 0;
const common_1 = require("@nestjs/common");
const _enums_1 = require("../../enums");
const _interceptors_1 = require("../../interceptors");
const QueryProcessing = (source, subSource) => {
    return (0, common_1.applyDecorators)((0, common_1.SetMetadata)(_enums_1.MetadataKey.QueryProcessingOptions, { source, subSource }), (0, common_1.UseInterceptors)((_interceptors_1.QueryProcessingInterceptor)));
};
exports.QueryProcessing = QueryProcessing;
//# sourceMappingURL=query-processing.decorator.js.map