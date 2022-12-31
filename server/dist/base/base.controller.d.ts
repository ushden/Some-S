import { Type } from '@nestjs/common';
import { Model, ModelCtor } from "sequelize-typescript";
import { IBaseService } from "./base.service";
import { Attributes, CountOptions, CreationAttributes, DestroyOptions, FindAndCountOptions, FindOptions, Identifier, UpdateOptions } from "sequelize";
import { ICurrentUser } from "@interfaces";
import { Service } from "@enums";
export interface IBaseController<M extends Model<M>> {
    readonly baseService: IBaseService<M>;
    updateOne(values: Partial<M>, options: Omit<UpdateOptions<Attributes<M>>, 'returning'>, user?: ICurrentUser): Promise<M>;
    find(options?: FindOptions<Attributes<M>>, user?: ICurrentUser): Promise<M[]>;
    findAndCountAll(options?: Omit<FindAndCountOptions<Attributes<M>>, 'group'>, user?: ICurrentUser): Promise<{
        rows: M[];
        count: number;
    }>;
    insertOne(values: CreationAttributes<M>, user?: ICurrentUser): Promise<M>;
    create(values?: CreationAttributes<M>, user?: ICurrentUser): Promise<M>;
    updateById(id: Identifier, values: Partial<M>, options: Omit<UpdateOptions<Attributes<M>>, 'returning'>, user?: ICurrentUser): Promise<M>;
    findById(id: Identifier, options?: FindOptions<Attributes<M>>, user?: ICurrentUser): Promise<M>;
    checkExisting(id: Identifier, options: FindOptions<Attributes<M>>, user?: ICurrentUser): Promise<{
        exists: boolean;
    }>;
    insertById(id: Identifier, values: CreationAttributes<M>, user?: ICurrentUser): Promise<M>;
    deleteById(id: Identifier, options: DestroyOptions<Attributes<M>>, user?: ICurrentUser): Promise<{
        count: number;
    }>;
    exists(id: Identifier, options: FindOptions<Attributes<M>>, user?: ICurrentUser): Promise<{
        exists: boolean;
    }>;
    count(options?: Omit<CountOptions<Attributes<M>>, 'group'>, user?: ICurrentUser): Promise<{
        count: number;
    }>;
    findOne(options?: FindOptions<Attributes<M>>, user?: ICurrentUser): Promise<M>;
    update(values: Partial<M>, options: Omit<UpdateOptions<Attributes<M>>, 'returning'>, user?: ICurrentUser): Promise<M[]>;
}
export declare const BaseController: <T extends Model<T, T>>(model: ModelCtor<T>, provider: Service) => Type<IBaseController<T>>;
