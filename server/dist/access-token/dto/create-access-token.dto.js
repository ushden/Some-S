"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAccessTokenDto = void 0;
const openapi = require("@nestjs/swagger");
class CreateAccessTokenDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, userId: { required: true, type: () => Number }, ttl: { required: true, type: () => Number } };
    }
}
exports.CreateAccessTokenDto = CreateAccessTokenDto;
//# sourceMappingURL=create-access-token.dto.js.map