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
exports.RoleMapping = void 0;
const openapi = require("@nestjs/swagger");
const sequelize_typescript_1 = require("sequelize-typescript");
const _enums_1 = require("../../common/enums");
const user_entity_1 = require("../../user/entities/user.entity");
const role_entity_1 = require("../../role/entities/role.entity");
let RoleMapping = class RoleMapping extends sequelize_typescript_1.Model {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, userId: { required: true, type: () => Number }, roleId: { required: true, type: () => Number } };
    }
};
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BIGINT, allowNull: false, unique: true, primaryKey: true, autoIncrement: true }),
    __metadata("design:type", Number)
], RoleMapping.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_entity_1.User),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BIGINT, allowNull: false }),
    __metadata("design:type", Number)
], RoleMapping.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => role_entity_1.Role),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BIGINT, allowNull: false }),
    __metadata("design:type", Number)
], RoleMapping.prototype, "roleId", void 0);
RoleMapping = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: _enums_1.Table.roleMapping, createdAt: false, updatedAt: false })
], RoleMapping);
exports.RoleMapping = RoleMapping;
//# sourceMappingURL=role-mapping.entity.js.map