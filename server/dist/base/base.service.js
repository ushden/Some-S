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
exports.BaseService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const BaseService = (model) => {
    class BaseServiceHost {
        async create(values, options) {
            return this.baseRepository.create(values, options);
        }
        async bulkCreate(records, options) {
            return this.baseRepository.bulkCreate(records, options);
        }
        async upsert(values, options) {
            return this.baseRepository.upsert(values, options);
        }
        async count(options) {
            return this.baseRepository.count(options);
        }
        async findOne(options) {
            return this.baseRepository.findOne(options);
        }
        async findById(id, options) {
            return this.baseRepository.findByPk(id, options);
        }
        async find(options) {
            return this.baseRepository.findAll(options);
        }
        async findOrCreate(options) {
            return this.baseRepository.findOrCreate(options);
        }
        async findCreateFind(options) {
            return this.baseRepository.findCreateFind(options);
        }
        async findAndCountAll(options) {
            return this.baseRepository.findAndCountAll(options);
        }
        async delete(options) {
            return this.baseRepository.destroy(options);
        }
        async update(values, options) {
            return this.baseRepository.update(values, Object.assign(Object.assign({}, options), { returning: true }));
        }
    }
    __decorate([
        (0, sequelize_1.InjectModel)(model),
        __metadata("design:type", Object)
    ], BaseServiceHost.prototype, "baseRepository", void 0);
    return (0, common_1.mixin)(BaseServiceHost);
};
exports.BaseService = BaseService;
//# sourceMappingURL=base.service.js.map