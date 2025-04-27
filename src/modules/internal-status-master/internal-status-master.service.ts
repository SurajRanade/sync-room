import { Injectable } from '@nestjs/common';
import { CreateInternalStatusMasterDto } from './dto/create-internal-status-master.dto';
import { UpdateInternalStatusMasterDto } from './dto/update-internal-status-master.dto';

@Injectable()
export class InternalStatusMasterService {
  create(createInternalStatusMasterDto: CreateInternalStatusMasterDto) {
    return 'This action adds a new internalStatusMaster';
  }

  findAll() {
    return `This action returns all internalStatusMaster`;
  }

  findOne(id: number) {
    return `This action returns a #${id} internalStatusMaster`;
  }

  update(id: number, updateInternalStatusMasterDto: UpdateInternalStatusMasterDto) {
    return `This action updates a #${id} internalStatusMaster`;
  }

  remove(id: number) {
    return `This action removes a #${id} internalStatusMaster`;
  }
}
