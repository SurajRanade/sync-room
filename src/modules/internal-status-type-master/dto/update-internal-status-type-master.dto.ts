import { PartialType } from '@nestjs/mapped-types';
import { CreateInternalStatusTypeMasterDto } from './create-internal-status-type-master.dto';

export class UpdateInternalStatusTypeMasterDto extends PartialType(CreateInternalStatusTypeMasterDto) {}
