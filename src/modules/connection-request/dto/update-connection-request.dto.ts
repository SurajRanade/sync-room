import { PartialType } from '@nestjs/mapped-types';
import { CreateConnectionRequestDto } from './create-connection-request.dto';

export class UpdateConnectionRequestDto extends PartialType(CreateConnectionRequestDto) {}
