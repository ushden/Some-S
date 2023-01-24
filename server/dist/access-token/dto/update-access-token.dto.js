"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAccessTokenDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_access_token_dto_1 = require("./create-access-token.dto");
class UpdateAccessTokenDto extends (0, swagger_1.PartialType)(create_access_token_dto_1.CreateAccessTokenDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateAccessTokenDto = UpdateAccessTokenDto;
//# sourceMappingURL=update-access-token.dto.js.map