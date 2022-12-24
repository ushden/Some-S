import {
  Column,
  DataType,
  Model,
  Table as SeqTable,
  CreatedAt,
  UpdatedAt,
  BelongsToMany
} from "sequelize-typescript";
import {Table} from "@enums";
import {User} from "../../users/entities/user.entity";
import {RoleMapping} from "../../role-mapping/entities/role-mapping.entity";

@SeqTable({tableName: Table.role})
export class Role extends Model<Role> {
  @Column({autoIncrement: true, unique: true, primaryKey: true, type: DataType.INTEGER})
  id: number

  @Column({unique: true, type: DataType.STRING, allowNull: false})
  name: string

  @Column({unique: false, type: DataType.STRING, allowNull: true})
  description: string

  @CreatedAt
  @Column({allowNull: false, defaultValue: DataType.NOW, type: DataType.DATE})
  createdAt: Date

  @UpdatedAt
  @Column({allowNull: false, defaultValue: DataType.NOW, type: DataType.DATE})
  updatedAt: Date

  @BelongsToMany(() => User, () => RoleMapping)
  users: User[]
}
