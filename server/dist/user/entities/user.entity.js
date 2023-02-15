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
exports.User = void 0;
const openapi = require("@nestjs/swagger");
const sequelize_typescript_1 = require("sequelize-typescript");
const _enums_1 = require("../../common/enums");
const role_entity_1 = require("../../role/entities/role.entity");
const role_mapping_entity_1 = require("../../role-mapping/entities/role-mapping.entity");
const access_token_entity_1 = require("../../access-token/entities/access-token.entity");
let User = class User extends sequelize_typescript_1.Model {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, email: { required: true, type: () => String }, name: { required: true, type: () => String }, phone: { required: true, type: () => String }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, verified: { required: true, type: () => Boolean }, meta: { required: true, type: () => Object }, telegramChatId: { required: true, type: () => String }, roles: { required: true, type: () => [require("../../role/entities/role.entity").Role] }, token: { required: true, type: () => require("../../access-token/entities/access-token.entity").AccessToken } };
    }
};
__decorate([
    (0, sequelize_typescript_1.Column)({ autoIncrement: true, unique: true, primaryKey: true, type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ unique: true, type: sequelize_typescript_1.DataType.STRING, allowNull: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ unique: false, type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ unique: true, type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    (0, sequelize_typescript_1.Column)({ allowNull: false, defaultValue: sequelize_typescript_1.DataType.NOW, type: sequelize_typescript_1.DataType.DATE }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    (0, sequelize_typescript_1.Column)({ allowNull: false, defaultValue: sequelize_typescript_1.DataType.NOW, type: sequelize_typescript_1.DataType.DATE }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: false, defaultValue: false, type: sequelize_typescript_1.DataType.BOOLEAN }),
    __metadata("design:type", Boolean)
], User.prototype, "verified", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, defaultValue: {}, type: sequelize_typescript_1.DataType.JSON }),
    __metadata("design:type", Object)
], User.prototype, "meta", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING, unique: true }),
    __metadata("design:type", String)
], User.prototype, "telegramChatId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => role_entity_1.Role, () => role_mapping_entity_1.RoleMapping),
    __metadata("design:type", Array)
], User.prototype, "roles", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => access_token_entity_1.AccessToken, 'userId'),
    __metadata("design:type", access_token_entity_1.AccessToken)
], User.prototype, "token", void 0);
User = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: _enums_1.Table.user })
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map