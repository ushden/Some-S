import {BelongsTo, Column, DataType, ForeignKey, Model, Table as SeqTable} from "sequelize-typescript";
import {Table} from "@enums";
import {User} from "../../user/entities/user.entity";

interface IService {
  id: number;
  name: string;
  price: number;
  leadTime: number;
}

@SeqTable({tableName: Table.event})
export class Event extends Model<Event> {
  @Column({type: DataType.BIGINT, primaryKey: true, unique: true, allowNull: false, autoIncrement: true})
  id: number

  @Column({type: DataType.STRING, allowNull: false})
  status: string

  @Column({type: DataType.BIGINT, allowNull: false})
  start: number

  @Column({type: DataType.BIGINT, allowNull: false})
  end: number

  @Column({type: DataType.BIGINT, allowNull: false})
  created: number
  
  @Column({type: DataType.BIGINT, allowNull: false})
  price: number
  
  @Column({type: DataType.BIGINT, allowNull: false})
  leadTime: number
  
  @Column({type: DataType.JSON, allowNull: false, defaultValue: []})
  services: Array<IService>

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER, allowNull: false})
  customerId: number

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER, allowNull: false})
  masterId: number

  @Column({type: DataType.JSON, defaultValue: {}, allowNull: false})
  meta: object

  @BelongsTo(() => User, 'customerId')
  customer: User

  @BelongsTo(() => User, 'masterId')
  master: User
}
