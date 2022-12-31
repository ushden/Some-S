"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
const openapi = require("@nestjs/swagger");
const sequelize_typescript_1 = require("sequelize-typescript");
const _enums_1 = require("../../common/enums");
let Service = class Service extends sequelize_typescript_1.Model {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, leadTime: { required: true, type: () => Number }, price: { required: true, type: () => Number } };
    }
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BIGINT,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Service.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, unique: false, allowNull: false }),
    __metadata("design:type", String)
], Service.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BIGINT, unique: false, allowNull: false }),
    __metadata("design:type", Number)
], Service.prototype, "leadTime", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BIGINT, unique: false, allowNull: false }),
    __metadata("design:type", Number)
], Service.prototype, "price", void 0);
Service = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: _enums_1.Table.service })
], Service);
exports.Service = Service;
//# sourceMappingURL=service.entity.js.map