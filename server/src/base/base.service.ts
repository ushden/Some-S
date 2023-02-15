import {mixin, Type} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Model, ModelCtor} from 'sequelize-typescript';
import {
  Attributes,
  BulkCreateOptions,
  CountOptions,
  CreateOptions,
  CreationAttributes,
  DestroyOptions,
  FindAndCountOptions,
  FindOptions,
  Identifier,
  UpdateOptions,
  UpsertOptions,
  FindOrCreateOptions,
} from 'sequelize';

export interface IBaseService<M extends Model<M>> {
  readonly baseRepository: ModelCtor<M>;
  create(values?: CreationAttributes<M>, options?: CreateOptions<Attributes<M>>): Promise<M>;
  bulkCreate(records: readonly CreationAttributes<M>[], options?: BulkCreateOptions<Attributes<M>>): Promise<M[]>;
  upsert(values: CreationAttributes<M>, options?: UpsertOptions<Attributes<M>>): Promise<[M, boolean | null]>;
  count(options?: Omit<CountOptions<Attributes<M>>, 'group'>): Promise<number>;
  findOne(options?: FindOptions<Attributes<M>>): Promise<M | null>;
  findById(id?: Identifier, options?: Omit<FindOptions<Attributes<M>>, 'where'>): Promise<M | null>;
  find(options?: FindOptions<Attributes<M>>): Promise<M[]>;
  findOrCreate(options: FindOrCreateOptions<Attributes<M>, CreationAttributes<M>>): Promise<[M, boolean]>;
  findCreateFind(options: FindOrCreateOptions<Attributes<M>, CreationAttributes<M>>): Promise<[M, boolean]>;
  findAndCountAll(options?: Omit<FindAndCountOptions<Attributes<M>>, 'group'>): Promise<{rows: M[]; count: number}>;
  delete(options?: DestroyOptions<Attributes<M>>): Promise<number>;
  update(values: Partial<M>, options: Omit<UpdateOptions<Attributes<M>>, 'returning'>): Promise<[number, M[]]>;
}

export const BaseService = <T extends Model<T>>(model: ModelCtor<T>): Type<IBaseService<T>> => {
  class BaseServiceHost<M extends Model<M>> implements IBaseService<M> {
    @InjectModel(model) public readonly baseRepository: ModelCtor<M>;

    public async create(values?: CreationAttributes<M>, options?: CreateOptions<Attributes<M>>): Promise<M> {
      return this.baseRepository.create(values, options);
    }

    public async bulkCreate(
      records: readonly CreationAttributes<M>[],
      options?: BulkCreateOptions<Attributes<M>>,
    ): Promise<M[]> {
      return this.baseRepository.bulkCreate(records, options);
    }

    public async upsert(
      values: CreationAttributes<M>,
      options?: UpsertOptions<Attributes<M>>,
    ): Promise<[M, boolean | null]> {
      return this.baseRepository.upsert(values, options);
    }

    public async count(options?: Omit<CountOptions<Attributes<M>>, 'group'>): Promise<number> {
      return this.baseRepository.count(options);
    }

    public async findOne(options?: FindOptions<Attributes<M>>): Promise<M | null> {
      return this.baseRepository.findOne(options);
    }

    public async findById(id?: Identifier, options?: Omit<FindOptions<Attributes<M>>, 'where'>): Promise<M | null> {
      return this.baseRepository.findByPk(id, options);
    }

    public async find(options?: FindOptions<Attributes<M>>): Promise<M[]> {
      return this.baseRepository.findAll(options);
    }

    public async findOrCreate(
      options: FindOrCreateOptions<Attributes<M>, CreationAttributes<M>>,
    ): Promise<[M, boolean]> {
      return this.baseRepository.findOrCreate(options);
    }

    public async findCreateFind(
      options: FindOrCreateOptions<Attributes<M>, CreationAttributes<M>>,
    ): Promise<[M, boolean]> {
      return this.baseRepository.findCreateFind(options);
    }

    public async findAndCountAll(
      options?: Omit<FindAndCountOptions<Attributes<M>>, 'group'>,
    ): Promise<{rows: M[]; count: number}> {
      return this.baseRepository.findAndCountAll(options);
    }

    public async delete(options?: DestroyOptions<Attributes<M>>): Promise<number> {
      return this.baseRepository.destroy(options);
    }

    public async update(
      values: Partial<M>,
      options: Omit<UpdateOptions<Attributes<M>>, 'returning'>,
    ): Promise<[number, M[]]> {
      return this.baseRepository.update(values, {...options, returning: true});
    }
  }

  return mixin<IBaseService<T>>(BaseServiceHost);
}