import { PartialType } from '@nestjs/mapped-types';
import { CreateInternalStatusMasterDto } from './create-internal-status-master.dto';

export class UpdateInternalStatusMasterDto extends PartialType(CreateInternalStatusMasterDto) {}
