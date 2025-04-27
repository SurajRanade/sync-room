import { Module } from '@nestjs/common';
import { InternalStatusMasterService } from './internal-status-master.service';
import { InternalStatusMasterController } from './internal-status-master.controller';

@Module({
  controllers: [InternalStatusMasterController],
  providers: [InternalStatusMasterService],
})
export class InternalStatusMasterModule {}
