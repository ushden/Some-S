import {
  Column,
  DataType,
  Model,
  Table as SeqTable,
  HasOne,
  CreatedAt,
  UpdatedAt,
  BelongsToMany
} from "sequelize-typescript";
import {Table} from "@enums";
import {Role} from "../../role/entities/role.entity";
import {RoleMapping} from "../../role-mapping/entities/role-mapping.entity";


@SeqTable({tableName: Table.user})
export class User extends Model<User> {
  @Column({autoIncrement: true, unique: true, primaryKey: true, type: DataType.INTEGER})
  id: number

  @Column({unique: true, type: DataType.STRING, allowNull: true})
  email: string

  @Column({unique: true, type: DataType.STRING, allowNull: false})
  phone: string

  @CreatedAt
  @Column({allowNull: false, defaultValue: DataType.NOW, type: DataType.DATE})
  createdAt: Date

  @UpdatedAt
  @Column({allowNull: false, defaultValue: DataType.NOW, type: DataType.DATE})
  updatedAt: Date

  @Column({allowNull: false, defaultValue: false, type: DataType.BOOLEAN})
  verified: boolean

  @Column({allowNull: true, defaultValue: {}, type: DataType.JSON})
  meta: object

  @BelongsToMany(() => Role, () => RoleMapping)
  roles: Role[]
}