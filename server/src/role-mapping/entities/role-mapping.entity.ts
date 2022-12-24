import {Column, DataType, ForeignKey, Model, Table as SeqTable} from "sequelize-typescript";
import {Table} from "@enums";
import {User} from "../../users/entities/user.entity";
import {Role} from "../../role/entities/role.entity";

@SeqTable({tableName: Table.roleMapping, createdAt: false, updatedAt: false})
export class RoleMapping extends Model<RoleMapping>{
  @Column({type: DataType.BIGINT, allowNull: false, unique: true, primaryKey: true, autoIncrement: true})
  id: number

  @ForeignKey(() => User)
  @Column({type: DataType.BIGINT, allowNull: false})
  userId: number

  @ForeignKey(() => Role)
  @Column({type: DataType.BIGINT, allowNull: false})
  roleId: number
}
