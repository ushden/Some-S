import {BelongsTo, Column, DataType, ForeignKey, Model, Table as SeqTable} from "sequelize-typescript";
import {Table} from "@enums";
import {User} from "../../user/entities/user.entity";

@SeqTable({tableName: Table.accessToken})
export class AccessToken extends Model<AccessToken> {
	@Column({type: DataType.STRING, primaryKey: true, allowNull: false, unique: true, autoIncrement: false})
	id: string;
	
	@Column({type: DataType.BIGINT, allowNull: false, unique: true})
	@ForeignKey(() => User)
	userId: number;
	
	@Column({type: DataType.BIGINT, allowNull: false})
	ttl: number;
}
