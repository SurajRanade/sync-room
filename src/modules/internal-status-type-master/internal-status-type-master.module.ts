import { Module } from '@nestjs/common';
import { InternalStatusTypeMasterService } from './internal-status-type-master.service';
import { InternalStatusTypeMasterController } from './internal-status-type-master.controller';

@Module({
  controllers: [InternalStatusTypeMasterController],
  providers: [InternalStatusTypeMasterService],
})
export class InternalStatusTypeMasterModule {}
