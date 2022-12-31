"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRoleMappingDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_role_mapping_dto_1 = require("./create-role-mapping.dto");
class UpdateRoleMappingDto extends (0, swagger_1.PartialType)(create_role_mapping_dto_1.CreateRoleMappingDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateRoleMappingDto = UpdateRoleMappingDto;
//# sourceMappingURL=update-role-mapping.dto.js.map