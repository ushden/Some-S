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
exports.Role = void 0;
const openapi = require("@nestjs/swagger");
const sequelize_typescript_1 = require("sequelize-typescript");
const _enums_1 = require("../../common/enums");
const user_entity_1 = require("../../user/entities/user.entity");
const role_mapping_entity_1 = require("../../role-mapping/entities/role-mapping.entity");
let Role = class Role extends sequelize_typescript_1.Model {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, description: { required: true, type: () => String }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, users: { required: true, type: () => [require("../../user/entities/user.entity").User] } };
    }
};
__decorate([
    (0, sequelize_typescript_1.Column)({ autoIncrement: true, unique: true, primaryKey: true, type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], Role.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ unique: true, type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], Role.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ unique: false, type: sequelize_typescript_1.DataType.STRING, allowNull: true }),
    __metadata("design:type", String)
], Role.prototype, "description", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    (0, sequelize_typescript_1.Column)({ allowNull: false, defaultValue: sequelize_typescript_1.DataType.NOW, type: sequelize_typescript_1.DataType.DATE }),
    __metadata("design:type", Date)
], Role.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    (0, sequelize_typescript_1.Column)({ allowNull: false, defaultValue: sequelize_typescript_1.DataType.NOW, type: sequelize_typescript_1.DataType.DATE }),
    __metadata("design:type", Date)
], Role.prototype, "updatedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => user_entity_1.User, () => role_mapping_entity_1.RoleMapping),
    __metadata("design:type", Array)
], Role.prototype, "users", void 0);
Role = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: _enums_1.Table.role })
], Role);
exports.Role = Role;
//# sourceMappingURL=role.entity.js.map