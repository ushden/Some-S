"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRoleMappingDto = void 0;
const openapi = require("@nestjs/swagger");
class CreateRoleMappingDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { userId: { required: true, type: () => Number }, roleId: { required: true, type: () => Number } };
    }
}
exports.CreateRoleMappingDto = CreateRoleMappingDto;
//# sourceMappingURL=create-role-mapping.dto.js.map