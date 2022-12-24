import {ApiModelPropertyOptional} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import {Column, DataType} from "sequelize-typescript";

export class BaseEntity {
  @Column({type: DataType.BIGINT, allowNull: false, unique: true, primaryKey: true, autoIncrement: true})
  @ApiModelPropertyOptional()
  public id: number;
}