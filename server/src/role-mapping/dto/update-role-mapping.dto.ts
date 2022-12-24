import { PartialType } from '@nestjs/swagger';
import { CreateRoleMappingDto } from './create-role-mapping.dto';

export class UpdateRoleMappingDto extends PartialType(CreateRoleMappingDto) {}
