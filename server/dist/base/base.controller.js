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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const _enums_1 = require("../common/enums");
const common_utils_1 = require("../common/utils/common-utils");
const _decorators_1 = require("../common/decorators");
const BaseController = (model, provider) => {
    let BaseControllerHost = class BaseControllerHost {
        async updateOne(values, options) {
            const { id } = values;
            if (!id) {
                throw new common_1.BadRequestException(`Id not provided`);
            }
            const resolvedOptions = common_utils_1.CommonUtilsService.concatIdWithOptions(id, options);
            const instance = await this.baseService.findOne(resolvedOptions);
            if (!instance) {
                throw new common_1.NotFoundException(`${model.name} with id ${id} not found`);
            }
            if (!common_utils_1.CommonUtilsService.compareTwoValues(instance.id, id)) {
                throw new common_1.BadRequestException(`Id cannot be updated`);
            }
            const [updatedCount, updatedInstances] = await this.baseService.update(values, resolvedOptions);
            if (!updatedCount) {
                throw new common_1.BadRequestException(`Cannot update ${model.name} instance with provided data`);
            }
            return updatedInstances[0];
        }
        async findAndCountAll(options) {
            return this.baseService.findAndCountAll(options || {});
        }
        async find(options) {
            return this.baseService.find(options);
        }
        async insertOne(values) {
            const [instance] = await this.baseService.upsert(values);
            return instance;
        }
        async create(values) {
            return this.baseService.create(values);
        }
        async updateById(id, values, options) {
            if (values.id && !common_utils_1.CommonUtilsService.compareTwoValues(values.id, id)) {
                throw new common_1.BadRequestException('Id cannot be updated');
            }
            const resolvedOptions = common_utils_1.CommonUtilsService.concatIdWithOptions(id, options);
            const [updatedCount, updatedInstances] = await this.baseService.update(values, resolvedOptions);
            if (!updatedCount) {
                const instance = await this.baseService.findOne(resolvedOptions);
                if (!instance) {
                    throw new common_1.NotFoundException(`${model.name} with id ${id} not found`);
                }
                throw new common_1.BadRequestException(`Cannot update ${model.name} instance with provided data`);
            }
            return updatedInstances[0];
        }
        async findById(id, options) {
            const resolvedOptions = common_utils_1.CommonUtilsService.concatIdWithOptions(id, options);
            const instance = await this.baseService.findOne(resolvedOptions);
            if (!instance) {
                throw new common_1.NotFoundException(`${model.name} with id ${id} not found`);
            }
            return instance;
        }
        async checkExisting(id, options) {
            const resolvedOptions = common_utils_1.CommonUtilsService.concatIdWithOptions(id, options);
            const instance = await this.baseService.findOne(resolvedOptions);
            return { exists: Boolean(instance) };
        }
        async insertById(id, values) {
            const [instance] = await this.baseService.upsert(Object.assign(Object.assign({}, values), { id }));
            return instance;
        }
        async deleteById(id, options) {
            const resolvedOptions = common_utils_1.CommonUtilsService.concatIdWithOptions(id, options);
            const count = await this.baseService.delete(resolvedOptions);
            return { count };
        }
        async exists(id, options) {
            const resolvedOptions = common_utils_1.CommonUtilsService.concatIdWithOptions(id, options);
            const instance = await this.baseService.findOne(resolvedOptions);
            return { exists: Boolean(instance) };
        }
        async count(options) {
            const count = await this.baseService.count(options);
            return { count };
        }
        async findOne(options) {
            const instance = await this.baseService.findOne(options);
            if (!instance) {
                throw new common_1.NotFoundException(`${model.name} not found`);
            }
            return instance;
        }
        async update(values, options) {
            const [, instances] = await this.baseService.update(values, options);
            return instances;
        }
    };
    __decorate([
        (0, common_1.Inject)(provider),
        __metadata("design:type", Object)
    ], BaseControllerHost.prototype, "baseService", void 0);
    __decorate([
        (0, swagger_1.ApiOperation)({ description: "", summary: `Patch an existing ${model.name} instance or insert a new one into the data source.` }),
        (0, swagger_1.ApiSecurity)('access_token'),
        (0, swagger_1.ApiConsumes)('application/json'),
        (0, swagger_1.ApiProduces)('application/json'),
        (0, swagger_1.ApiForbiddenResponse)({ description: 'Forbidden' }),
        (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized' }),
        (0, swagger_1.ApiBody)({ type: model }),
        (0, swagger_1.ApiOkResponse)({ description: 'OK', type: model }),
        (0, common_1.Patch)(),
        openapi.ApiResponse({ status: 200 }),
        __param(0, (0, common_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], BaseControllerHost.prototype, "updateOne", null);
    __decorate([
        (0, swagger_1.ApiOperation)({ description: "", summary: `Find all instances of the ${model.name} matched by filter from the data source.` }),
        (0, swagger_1.ApiSecurity)('access_token'),
        (0, swagger_1.ApiConsumes)('application/json'),
        (0, swagger_1.ApiProduces)('application/json'),
        (0, swagger_1.ApiForbiddenResponse)({ description: 'Forbidden' }),
        (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized' }),
        (0, swagger_1.ApiQuery)({ name: 'filter', type: String, required: false }),
        (0, swagger_1.ApiOkResponse)({
            description: 'OK',
            type: model,
            isArray: true,
            headers: { 'X-Total-Count': { description: `Total count of found ${model.name} instances` } },
        }),
        (0, _decorators_1.QueryProcessing)(_enums_1.RequestQuerySource.Query, _enums_1.RequestQuerySubSource.Filter),
        (0, common_1.Get)(),
        openapi.ApiResponse({ status: 200 }),
        __param(0, (0, _decorators_1.AllowedQuery)({ source: _enums_1.RequestQuerySource.Query })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], BaseControllerHost.prototype, "findAndCountAll", null);
    __decorate([
        (0, swagger_1.ApiOperation)({ description: "", summary: `Find all instances of the ${model.name} matched by filter from the data source.` }),
        (0, swagger_1.ApiSecurity)('access_token'),
        (0, swagger_1.ApiConsumes)('application/json'),
        (0, swagger_1.ApiProduces)('application/json'),
        (0, swagger_1.ApiForbiddenResponse)({ description: 'Forbidden' }),
        (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized' }),
        (0, swagger_1.ApiQuery)({ name: 'filter', type: String, required: false }),
        (0, swagger_1.ApiOkResponse)({
            description: 'OK',
            type: model,
            isArray: true,
            headers: { 'X-Total-Count': { description: `Total count of found ${model.name} instances` } },
        }),
        (0, common_1.Get)(),
        openapi.ApiResponse({ status: 200 }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], BaseControllerHost.prototype, "find", null);
    __decorate([
        (0, swagger_1.ApiOperation)({ description: "", summary: `Replace an existing ${model.name} instance or insert a new one into the data source.` }),
        (0, swagger_1.ApiSecurity)('access_token'),
        (0, swagger_1.ApiConsumes)('application/json'),
        (0, swagger_1.ApiProduces)('application/json'),
        (0, swagger_1.ApiForbiddenResponse)({ description: 'Forbidden' }),
        (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized' }),
        (0, swagger_1.ApiBody)({ type: model }),
        (0, swagger_1.ApiOkResponse)({ description: 'OK', type: model }),
        (0, common_1.Put)(),
        openapi.ApiResponse({ status: 200 }),
        __param(0, (0, common_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], BaseControllerHost.prototype, "insertOne", null);
    __decorate([
        (0, swagger_1.ApiOperation)({ description: "", summary: `Create a new instance of the ${model.name} and persist it into the data source.` }),
        (0, swagger_1.ApiSecurity)('access_token'),
        (0, swagger_1.ApiConsumes)('application/json'),
        (0, swagger_1.ApiProduces)('application/json'),
        (0, swagger_1.ApiForbiddenResponse)({ description: 'Forbidden' }),
        (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized' }),
        (0, swagger_1.ApiBody)({ type: model }),
        (0, swagger_1.ApiCreatedResponse)({ description: 'Created', type: model }),
        (0, common_1.Post)(),
        openapi.ApiResponse({ status: 201 }),
        __param(0, (0, common_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], BaseControllerHost.prototype, "create", null);
    __decorate([
        (0, swagger_1.ApiOperation)({ description: "", summary: `Patch attributes for a ${model.name} instance and persist it into the data source.` }),
        (0, swagger_1.ApiSecurity)('access_token'),
        (0, swagger_1.ApiConsumes)('application/json'),
        (0, swagger_1.ApiProduces)('application/json'),
        (0, swagger_1.ApiForbiddenResponse)({ description: 'Forbidden' }),
        (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized' }),
        (0, swagger_1.ApiParam)({ name: 'id', description: `${model.name} id`, type: `Identifier` }),
        (0, swagger_1.ApiBody)({ type: model }),
        (0, swagger_1.ApiOkResponse)({ description: 'OK', type: model }),
        (0, swagger_1.ApiNotFoundResponse)({ description: `${model.name} not found` }),
        (0, swagger_1.ApiBadRequestResponse)({ description: `Cannot update ${model.name} instance with provided data` }),
        (0, common_1.Patch)(':id'),
        openapi.ApiResponse({ status: 200 }),
        __param(0, (0, common_1.Param)('id')),
        __param(1, (0, common_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Object]),
        __metadata("design:returntype", Promise)
    ], BaseControllerHost.prototype, "updateById", null);
    __decorate([
        (0, swagger_1.ApiOperation)({ description: "", summary: `Find a ${model.name} instance by id from the data source.` }),
        (0, swagger_1.ApiSecurity)('access_token'),
        (0, swagger_1.ApiConsumes)('application/json'),
        (0, swagger_1.ApiProduces)('application/json'),
        (0, swagger_1.ApiForbiddenResponse)({ description: 'Forbidden' }),
        (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized' }),
        (0, swagger_1.ApiParam)({ name: 'id', description: `${model.name} id`, type: 'Identifier' }),
        (0, swagger_1.ApiQuery)({ name: 'filter', type: String, required: false }),
        (0, swagger_1.ApiOkResponse)({ description: 'OK', type: model }),
        (0, swagger_1.ApiNotFoundResponse)({ description: `${model.name} not found` }),
        (0, common_1.Get)(':id'),
        openapi.ApiResponse({ status: 200 }),
        __param(0, (0, common_1.Param)('id')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], BaseControllerHost.prototype, "findById", null);
    __decorate([
        (0, swagger_1.ApiOperation)({ description: "", summary: `Check whether a ${model.name} instance exists in the data source.` }),
        (0, swagger_1.ApiSecurity)('access_token'),
        (0, swagger_1.ApiConsumes)('application/json'),
        (0, swagger_1.ApiProduces)('application/json'),
        (0, swagger_1.ApiForbiddenResponse)({ description: 'Forbidden' }),
        (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized' }),
        (0, swagger_1.ApiParam)({ name: 'id', description: `${model.name} id`, type: 'Identifier' }),
        (0, swagger_1.ApiOkResponse)({ description: 'OK', schema: { type: 'object', properties: { exists: { type: 'boolean' } } } }),
        (0, common_1.Head)(':id'),
        openapi.ApiResponse({ status: 200 }),
        __param(0, (0, common_1.Param)('id')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], BaseControllerHost.prototype, "checkExisting", null);
    __decorate([
        (0, swagger_1.ApiOperation)({ description: "", summary: `Replace attributes for a ${model.name} instance and persist it into the data source.` }),
        (0, swagger_1.ApiSecurity)('access_token'),
        (0, swagger_1.ApiConsumes)('application/json'),
        (0, swagger_1.ApiProduces)('application/json'),
        (0, swagger_1.ApiForbiddenResponse)({ description: 'Forbidden' }),
        (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized' }),
        (0, swagger_1.ApiParam)({ name: 'id', description: `${model.name} id`, type: 'Identifier' }),
        (0, swagger_1.ApiBody)({ type: model }),
        (0, swagger_1.ApiOkResponse)({ description: 'OK', type: model }),
        (0, common_1.Put)(':id'),
        openapi.ApiResponse({ status: 200 }),
        __param(0, (0, common_1.Param)('id')),
        __param(1, (0, common_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], BaseControllerHost.prototype, "insertById", null);
    __decorate([
        (0, swagger_1.ApiOperation)({ description: "", summary: `Delete a ${model.name} instance by id from the data source.` }),
        (0, swagger_1.ApiSecurity)('access_token'),
        (0, swagger_1.ApiConsumes)('application/json'),
        (0, swagger_1.ApiProduces)('application/json'),
        (0, swagger_1.ApiForbiddenResponse)({ description: 'Forbidden' }),
        (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized' }),
        (0, swagger_1.ApiParam)({ name: 'id', description: `${model.name} id`, type: 'Identifier' }),
        (0, swagger_1.ApiOkResponse)({ description: 'OK', schema: { type: 'object', properties: { count: { type: 'number' } } } }),
        (0, common_1.Delete)(':id'),
        openapi.ApiResponse({ status: 200 }),
        __param(0, (0, common_1.Param)('id')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], BaseControllerHost.prototype, "deleteById", null);
    __decorate([
        (0, swagger_1.ApiOperation)({ description: "", summary: `Check whether a ${model.name} instance exists in the data source.` }),
        (0, swagger_1.ApiSecurity)('access_token'),
        (0, swagger_1.ApiConsumes)('application/json'),
        (0, swagger_1.ApiProduces)('application/json'),
        (0, swagger_1.ApiForbiddenResponse)({ description: 'Forbidden' }),
        (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized' }),
        (0, swagger_1.ApiParam)({ name: 'id', description: `${model.name} id`, type: 'Identifier' }),
        (0, swagger_1.ApiOkResponse)({ description: 'OK', schema: { type: 'object', properties: { exists: { type: 'boolean' } } } }),
        (0, common_1.Get)(':id/exists'),
        openapi.ApiResponse({ status: 200 }),
        __param(0, (0, common_1.Param)('id')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], BaseControllerHost.prototype, "exists", null);
    __decorate([
        (0, swagger_1.ApiOperation)({ description: "", summary: `Count instances of the ${model.name} matched by where from the data source.` }),
        (0, swagger_1.ApiSecurity)('access_token'),
        (0, swagger_1.ApiConsumes)('application/json'),
        (0, swagger_1.ApiProduces)('application/json'),
        (0, swagger_1.ApiForbiddenResponse)({ description: 'Forbidden' }),
        (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized' }),
        (0, swagger_1.ApiQuery)({ name: 'where', type: String, required: false }),
        (0, swagger_1.ApiOkResponse)({ description: 'OK', schema: { type: 'object', properties: { count: { type: 'number' } } } }),
        (0, common_1.Get)('count'),
        openapi.ApiResponse({ status: 200 }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], BaseControllerHost.prototype, "count", null);
    __decorate([
        (0, swagger_1.ApiOperation)({ description: "", summary: `Find first instance of the ${model.name} matched by filter from the data source.` }),
        (0, swagger_1.ApiSecurity)('access_token'),
        (0, swagger_1.ApiConsumes)('application/json'),
        (0, swagger_1.ApiProduces)('application/json'),
        (0, swagger_1.ApiForbiddenResponse)({ description: 'Forbidden' }),
        (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized' }),
        (0, swagger_1.ApiQuery)({ name: 'filter', type: String, required: false }),
        (0, swagger_1.ApiOkResponse)({ description: 'OK', type: model }),
        (0, swagger_1.ApiNotFoundResponse)({ description: `${model.name} not found` }),
        (0, common_1.Get)('findOne'),
        openapi.ApiResponse({ status: 200 }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], BaseControllerHost.prototype, "findOne", null);
    __decorate([
        (0, swagger_1.ApiOperation)({ description: "", summary: `Update instances of the ${model.name} matched by where from the data source.` }),
        (0, swagger_1.ApiSecurity)('access_token'),
        (0, swagger_1.ApiConsumes)('application/json'),
        (0, swagger_1.ApiProduces)('application/json'),
        (0, swagger_1.ApiForbiddenResponse)({ description: 'Forbidden' }),
        (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized' }),
        (0, swagger_1.ApiBody)({ type: model }),
        (0, swagger_1.ApiQuery)({ name: 'where', type: String, required: false }),
        (0, swagger_1.ApiOkResponse)({ description: 'OK', schema: { type: 'object', properties: { count: { type: 'number' } } } }),
        (0, common_1.Post)('update'),
        openapi.ApiResponse({ status: 201 }),
        __param(0, (0, common_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], BaseControllerHost.prototype, "update", null);
    BaseControllerHost = __decorate([
        (0, swagger_1.ApiTags)(model.name)
    ], BaseControllerHost);
    return (0, common_1.mixin)(BaseControllerHost);
};
exports.BaseController = BaseController;
//# sourceMappingURL=base.controller.js.map