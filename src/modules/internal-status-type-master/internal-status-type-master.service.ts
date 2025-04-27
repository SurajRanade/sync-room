import { Injectable } from '@nestjs/common';
import { CreateInternalStatusTypeMasterDto } from './dto/create-internal-status-type-master.dto';
import { UpdateInternalStatusTypeMasterDto } from './dto/update-internal-status-type-master.dto';

@Injectable()
export class InternalStatusTypeMasterService {
  create(createInternalStatusTypeMasterDto: CreateInternalStatusTypeMasterDto) {
    return 'This action adds a new internalStatusTypeMaster';
  }

  findAll() {
    return `This action returns all internalStatusTypeMaster`;
  }

  findOne(id: number) {
    return `This action returns a #${id} internalStatusTypeMaster`;
  }

  update(id: number, updateInternalStatusTypeMasterDto: UpdateInternalStatusTypeMasterDto) {
    return `This action updates a #${id} internalStatusTypeMaster`;
  }

  remove(id: number) {
    return `This action removes a #${id} internalStatusTypeMaster`;
  }
}
