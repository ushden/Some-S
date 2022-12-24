import {
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
  Type,
  Inject,
  mixin,
  NotFoundException,
  BadRequestException,
  Patch,
  Head
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiProduces,
  ApiQuery,
  ApiSecurity,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import {Model, ModelCtor} from "sequelize-typescript";
import {IBaseService} from "./base.service";
import {
  Attributes,
  CountOptions,
  CreationAttributes,
  DestroyOptions,
  FindAndCountOptions,
  FindOptions,
  Identifier,
  UpdateOptions
} from "sequelize";
import {ICurrentUser} from "@interfaces";
import {Service} from "@enums";
import {CommonUtilsService} from "@utils/common-utils";

export interface IBaseController<M extends Model<M>> {
  readonly baseService: IBaseService<M>;

  updateOne(
    values: Partial<M>,
    options: Omit<UpdateOptions<Attributes<M>>, 'returning'>,
    user?: ICurrentUser,
  ): Promise<M>;

  find(options?: FindOptions<Attributes<M>>, user?: ICurrentUser): Promise<M[]>;

  findAndCountAll(
    options?: Omit<FindAndCountOptions<Attributes<M>>, 'group'>,
    user?: ICurrentUser,
  ): Promise<{ rows: M[]; count: number }>;

  insertOne(values: CreationAttributes<M>, user?: ICurrentUser): Promise<M>;

  create(values?: CreationAttributes<M>, user?: ICurrentUser): Promise<M>;

  updateById(
    id: Identifier,
    values: Partial<M>,
    options: Omit<UpdateOptions<Attributes<M>>, 'returning'>,
    user?: ICurrentUser,
  ): Promise<M>;

  findById(id: Identifier, options?: FindOptions<Attributes<M>>, user?: ICurrentUser): Promise<M>;

  checkExisting(id: Identifier, options: FindOptions<Attributes<M>>, user?: ICurrentUser): Promise<{ exists: boolean }>;

  insertById(id: Identifier, values: CreationAttributes<M>, user?: ICurrentUser): Promise<M>;

  deleteById(id: Identifier, options: DestroyOptions<Attributes<M>>, user?: ICurrentUser): Promise<{ count: number }>;

  exists(id: Identifier, options: FindOptions<Attributes<M>>, user?: ICurrentUser): Promise<{ exists: boolean }>;

  count(options?: Omit<CountOptions<Attributes<M>>, 'group'>, user?: ICurrentUser): Promise<{ count: number }>;

  findOne(options?: FindOptions<Attributes<M>>, user?: ICurrentUser): Promise<M>;

  update(
    values: Partial<M>,
    options: Omit<UpdateOptions<Attributes<M>>, 'returning'>,
    user?: ICurrentUser,
  ): Promise<M[]>;
}

export const BaseController = <T extends Model<T>>(model: ModelCtor<T>, provider: Service): Type<IBaseController<T>> => {
  @ApiTags(model.name)
  class BaseControllerHost<M extends Model<M>> implements IBaseController<M> {
    @Inject(provider) public readonly baseService: IBaseService<M>;

    // Base
    @ApiSecurity('access_token')
    @ApiConsumes('application/json')
    @ApiProduces('application/json')
    @ApiForbiddenResponse({description: 'Forbidden'})
    @ApiUnauthorizedResponse({description: 'Unauthorized'})
    // End Base todo create custom decorator
    @ApiOperation({summary: `Patch an existing ${model.name} instance or insert a new one into the data source.`})
    @ApiBody({type: model})
    @ApiOkResponse({description: 'OK', type: model})
    @Patch()
    public async updateOne(
      @Body() values: Partial<M>,
      options: Omit<UpdateOptions<Attributes<M>>, 'returning'>,
    ): Promise<M> {
      const {id} = values;
      if (!id) {
        throw new BadRequestException(`Id not provided`);
      }

      const resolvedOptions = CommonUtilsService.concatIdWithOptions(id, options);

      const instance = await this.baseService.findOne(resolvedOptions);
      if (!instance) {
        throw new NotFoundException(`${model.name} with id ${id} not found`);
      }

      if (!CommonUtilsService.compareTwoValues(instance.id, id)) {
        throw new BadRequestException(`Id cannot be updated`);
      }

      const [updatedCount, updatedInstances] = await this.baseService.update(values, resolvedOptions);
      if (!updatedCount) {
        throw new BadRequestException(`Cannot update ${model.name} instance with provided data`);
      }

      return updatedInstances[0];
    }

    // Base
    @ApiSecurity('access_token')
    @ApiConsumes('application/json')
    @ApiProduces('application/json')
    @ApiForbiddenResponse({description: 'Forbidden'})
    @ApiUnauthorizedResponse({description: 'Unauthorized'})
    // End Base todo create custom decorator
    @ApiOperation({summary: `Find all instances of the ${model.name} matched by filter from the data source.`})
    @ApiQuery({name: 'filter', type: String, required: false})
    @ApiOkResponse({
      description: 'OK',
      type: model,
      isArray: true,
      headers: {'X-Total-Count': {description: `Total count of found ${model.name} instances`}},
    })
    @Get()
    public async findAndCountAll(
      options?: Omit<FindAndCountOptions<Attributes<M>>, 'group'>,
    ): Promise<{ rows: M[]; count: number }> {
      return this.baseService.findAndCountAll({...options, distinct: true});
    }

    // Base
    @ApiSecurity('access_token')
    @ApiConsumes('application/json')
    @ApiProduces('application/json')
    @ApiForbiddenResponse({description: 'Forbidden'})
    @ApiUnauthorizedResponse({description: 'Unauthorized'})
    // End Base todo create custom decorator
    @ApiOperation({summary: `Find all instances of the ${model.name} matched by filter from the data source.`})
    @ApiQuery({name: 'filter', type: String, required: false})
    @ApiOkResponse({
      description: 'OK',
      type: model,
      isArray: true,
      headers: {'X-Total-Count': {description: `Total count of found ${model.name} instances`}},
    })
    @Get()
    public async find(
      options?: FindOptions<Attributes<M>>,
    ): Promise<M[]> {
      return this.baseService.find(options);
    }

    // Base
    @ApiSecurity('access_token')
    @ApiConsumes('application/json')
    @ApiProduces('application/json')
    @ApiForbiddenResponse({description: 'Forbidden'})
    @ApiUnauthorizedResponse({description: 'Unauthorized'})
    // End Base todo create custom decorator
    @ApiOperation({summary: `Replace an existing ${model.name} instance or insert a new one into the data source.`})
    @ApiBody({type: model})
    @ApiOkResponse({description: 'OK', type: model})
    @Put()
    public async insertOne(@Body() values: CreationAttributes<M>): Promise<M> {
      const [instance] = await this.baseService.upsert(values);
      return instance;
    }

    // Base
    @ApiSecurity('access_token')
    @ApiConsumes('application/json')
    @ApiProduces('application/json')
    @ApiForbiddenResponse({description: 'Forbidden'})
    @ApiUnauthorizedResponse({description: 'Unauthorized'})
    // End Base todo create custom decorator
    @ApiOperation({summary: `Create a new instance of the ${model.name} and persist it into the data source.`})
    @ApiBody({type: model})
    @ApiCreatedResponse({description: 'Created', type: model})
    @Post()
    public async create(@Body() values?: CreationAttributes<M>): Promise<M> {
      return this.baseService.create(values);
    }

    // Base
    @ApiSecurity('access_token')
    @ApiConsumes('application/json')
    @ApiProduces('application/json')
    @ApiForbiddenResponse({description: 'Forbidden'})
    @ApiUnauthorizedResponse({description: 'Unauthorized'})
    // End Base todo create custom decorator
    @ApiOperation({summary: `Patch attributes for a ${model.name} instance and persist it into the data source.`})
    @ApiParam({name: 'id', description: `${model.name} id`, type: `Identifier`})
    @ApiBody({type: model})
    @ApiOkResponse({description: 'OK', type: model})
    @ApiNotFoundResponse({description: `${model.name} not found`})
    @ApiBadRequestResponse({description: `Cannot update ${model.name} instance with provided data`})
    @Patch(':id')
    public async updateById(
      @Param('id') id: Identifier,
      @Body() values: Partial<M>,
      options: Omit<UpdateOptions<Attributes<M>>, 'returning'>,
    ): Promise<M> {
      if (values.id && !CommonUtilsService.compareTwoValues(values.id, id)) {
        throw new BadRequestException('Id cannot be updated');
      }

      const resolvedOptions = CommonUtilsService.concatIdWithOptions(id, options);
      const [updatedCount, updatedInstances] = await this.baseService.update(values, resolvedOptions);

      if (!updatedCount) {
        const instance = await this.baseService.findOne(resolvedOptions);
        if (!instance) {
          throw new NotFoundException(`${model.name} with id ${id} not found`);
        }

        throw new BadRequestException(`Cannot update ${model.name} instance with provided data`);
      }

      return updatedInstances[0];
    }

    // Base
    @ApiSecurity('access_token')
    @ApiConsumes('application/json')
    @ApiProduces('application/json')
    @ApiForbiddenResponse({description: 'Forbidden'})
    @ApiUnauthorizedResponse({description: 'Unauthorized'})
    // End Base todo create custom decorator
    @ApiOperation({summary: `Find a ${model.name} instance by id from the data source.`})
    @ApiParam({name: 'id', description: `${model.name} id`, type: 'Identifier'})
    @ApiQuery({name: 'filter', type: String, required: false})
    @ApiOkResponse({description: 'OK', type: model})
    @ApiNotFoundResponse({description: `${model.name} not found`})
    @Get(':id')
    public async findById(
      @Param('id') id: Identifier,
      options?: FindOptions<Attributes<M>>,
    ): Promise<M> {
      const resolvedOptions = CommonUtilsService.concatIdWithOptions(id, options);

      const instance = await this.baseService.findOne(resolvedOptions);
      if (!instance) {
        throw new NotFoundException(`${model.name} with id ${id} not found`);
      }

      return instance;
    }

    // Base
    @ApiSecurity('access_token')
    @ApiConsumes('application/json')
    @ApiProduces('application/json')
    @ApiForbiddenResponse({description: 'Forbidden'})
    @ApiUnauthorizedResponse({description: 'Unauthorized'})
    // End Base todo create custom decorator
    @ApiOperation({summary: `Check whether a ${model.name} instance exists in the data source.`})
    @ApiParam({name: 'id', description: `${model.name} id`, type: 'Identifier'})
    @ApiOkResponse({description: 'OK', schema: {type: 'object', properties: {exists: {type: 'boolean'}}}})
    @Head(':id')
    public async checkExisting(
      @Param('id') id: Identifier,
      options: FindOptions<Attributes<M>>,
    ): Promise<{ exists: boolean }> {
      const resolvedOptions = CommonUtilsService.concatIdWithOptions(id, options);

      const instance = await this.baseService.findOne(resolvedOptions);
      return {exists: Boolean(instance)};
    }

    // Base
    @ApiSecurity('access_token')
    @ApiConsumes('application/json')
    @ApiProduces('application/json')
    @ApiForbiddenResponse({description: 'Forbidden'})
    @ApiUnauthorizedResponse({description: 'Unauthorized'})
    // End Base todo create custom decorator
    @ApiOperation({summary: `Replace attributes for a ${model.name} instance and persist it into the data source.`})
    @ApiParam({name: 'id', description: `${model.name} id`, type: 'Identifier'})
    @ApiBody({type: model})
    @ApiOkResponse({description: 'OK', type: model})
    @Put(':id')
    public async insertById(
      @Param('id') id: Identifier,
      @Body() values: CreationAttributes<M>,
    ): Promise<M> {
      const [instance] = await this.baseService.upsert({...values, id});
      return instance;
    }

    // Base
    @ApiSecurity('access_token')
    @ApiConsumes('application/json')
    @ApiProduces('application/json')
    @ApiForbiddenResponse({description: 'Forbidden'})
    @ApiUnauthorizedResponse({description: 'Unauthorized'})
    // End Base todo create custom decorator
    @ApiOperation({summary: `Delete a ${model.name} instance by id from the data source.`})
    @ApiParam({name: 'id', description: `${model.name} id`, type: 'Identifier'})
    @ApiOkResponse({description: 'OK', schema: {type: 'object', properties: {count: {type: 'number'}}}})
    @Delete(':id')
    public async deleteById(
      @Param('id') id: Identifier,
      options: DestroyOptions<Attributes<M>>,
    ): Promise<{ count: number }> {
      const resolvedOptions = CommonUtilsService.concatIdWithOptions(id, options);

      const count = await this.baseService.delete(resolvedOptions);
      return {count};
    }

    // Base
    @ApiSecurity('access_token')
    @ApiConsumes('application/json')
    @ApiProduces('application/json')
    @ApiForbiddenResponse({description: 'Forbidden'})
    @ApiUnauthorizedResponse({description: 'Unauthorized'})
    // End Base todo create custom decorator
    @ApiOperation({summary: `Check whether a ${model.name} instance exists in the data source.`})
    @ApiParam({name: 'id', description: `${model.name} id`, type: 'Identifier'})
    @ApiOkResponse({description: 'OK', schema: {type: 'object', properties: {exists: {type: 'boolean'}}}})
    @Get(':id/exists')
    public async exists(
      @Param('id') id: Identifier,
      options: FindOptions<Attributes<M>>,
    ): Promise<{ exists: boolean }> {
      const resolvedOptions = CommonUtilsService.concatIdWithOptions(id, options);

      const instance = await this.baseService.findOne(resolvedOptions);
      return {exists: Boolean(instance)};
    }

    // Base
    @ApiSecurity('access_token')
    @ApiConsumes('application/json')
    @ApiProduces('application/json')
    @ApiForbiddenResponse({description: 'Forbidden'})
    @ApiUnauthorizedResponse({description: 'Unauthorized'})
    // End Base todo create custom decorator
    @ApiOperation({summary: `Count instances of the ${model.name} matched by where from the data source.`})
    @ApiQuery({name: 'where', type: String, required: false})
    @ApiOkResponse({description: 'OK', schema: {type: 'object', properties: {count: {type: 'number'}}}})
    @Get('count')
    public async count(
      options?: Omit<CountOptions<Attributes<M>>, 'group'>,
    ): Promise<{ count: number }> {
      const count = await this.baseService.count(options);
      return {count};
    }

    // Base
    @ApiSecurity('access_token')
    @ApiConsumes('application/json')
    @ApiProduces('application/json')
    @ApiForbiddenResponse({description: 'Forbidden'})
    @ApiUnauthorizedResponse({description: 'Unauthorized'})
    // End Base todo create custom decorator
    @ApiOperation({summary: `Find first instance of the ${model.name} matched by filter from the data source.`})
    @ApiQuery({name: 'filter', type: String, required: false})
    @ApiOkResponse({description: 'OK', type: model})
    @ApiNotFoundResponse({description: `${model.name} not found`})
    @Get('findOne')
    public async findOne(
      options?: FindOptions<Attributes<M>>,
    ): Promise<M> {
      const instance = await this.baseService.findOne(options);
      if (!instance) {
        throw new NotFoundException(`${model.name} not found`);
      }

      return instance;
    }

    // Base
    @ApiSecurity('access_token')
    @ApiConsumes('application/json')
    @ApiProduces('application/json')
    @ApiForbiddenResponse({description: 'Forbidden'})
    @ApiUnauthorizedResponse({description: 'Unauthorized'})
    // End Base todo create custom decorator
    @ApiOperation({summary: `Update instances of the ${model.name} matched by where from the data source.`})
    @ApiBody({type: model})
    @ApiQuery({name: 'where', type: String, required: false})
    @ApiOkResponse({description: 'OK', schema: {type: 'object', properties: {count: {type: 'number'}}}})
    @Post('update')
    public async update(
      @Body() values: Partial<M>,
      options: Omit<UpdateOptions<Attributes<M>>, 'returning'>,
    ): Promise<M[]> {
      const [, instances] = await this.baseService.update(values, options);
      return instances;
    }
  }

  return mixin<IBaseController<T>>(BaseControllerHost);
}