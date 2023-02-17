import {IsNotEmpty, IsString, IsArray, IsNumber} from "class-validator";
import {Status} from "@enums";

interface IService {
  id: number;
  name: string;
  price: number;
  leadTime: number;
}

export class CreateEventDto {
  @IsArray()
  @IsNotEmpty()
  readonly services: Array<IService>
  
  @IsNumber()
  @IsNotEmpty()
  readonly start: number
  
  @IsNumber()
  @IsNotEmpty()
  readonly end: number
  
  @IsNumber()
  @IsNotEmpty()
  readonly created: number
  
  @IsString()
  @IsNotEmpty()
  readonly status: Status
  
  @IsNumber()
  @IsNotEmpty()
  readonly customerId: number
  
  @IsNumber()
  @IsNotEmpty()
  readonly masterId: number
  
  @IsNumber()
  @IsNotEmpty()
  readonly leadTime: number
  
  @IsNumber()
  @IsNotEmpty()
  readonly price: number
}
