"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEventDto = void 0;
const openapi = require("@nestjs/swagger");
class CreateEventDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { start: { required: true, type: () => Number }, end: { required: true, type: () => Number }, create: { required: true, type: () => Number }, status: { required: true, type: () => String }, customerId: { required: true, type: () => Number }, masterId: { required: true, type: () => Number } };
    }
}
exports.CreateEventDto = CreateEventDto;
//# sourceMappingURL=create-event.dto.js.map