import {
  Column,
  DataType,
  Model,
  Table as SeqTable,
} from 'sequelize-typescript';
import { Table } from '@enums';

@SeqTable({ tableName: Table.service })
export class Service extends Model<Service> {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
    allowNull: false,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  name: string;

  @Column({ type: DataType.BIGINT, unique: false, allowNull: false })
  leadTime: number;

  @Column({ type: DataType.BIGINT, unique: false, allowNull: false })
  price: number;
}
