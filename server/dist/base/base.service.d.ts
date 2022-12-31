import { Type } from '@nestjs/common';
import { Model, ModelCtor } from 'sequelize-typescript';
import { Attributes, BulkCreateOptions, CountOptions, CreateOptions, CreationAttributes, DestroyOptions, FindAndCountOptions, FindOptions, Identifier, UpdateOptions, UpsertOptions, FindOrCreateOptions } from 'sequelize';
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
    findAndCountAll(options?: Omit<FindAndCountOptions<Attributes<M>>, 'group'>): Promise<{
        rows: M[];
        count: number;
    }>;
    delete(options?: DestroyOptions<Attributes<M>>): Promise<number>;
    update(values: Partial<M>, options: Omit<UpdateOptions<Attributes<M>>, 'returning'>): Promise<[number, M[]]>;
}
export declare const BaseService: <T extends Model<T, T>>(model: ModelCtor<T>) => Type<IBaseService<T>>;
