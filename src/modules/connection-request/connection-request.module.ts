import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InternalStatus } from '../internal-status-master/entities/internal-status-master.entity';
import { UserConnectionsModule } from '../user-connections/user-connections.module';
import { User } from '../user/entities/user.entity';
import { ConnectionRequestController } from './connection-request.controller';
import { ConnectionRequestService } from './connection-request.service';
import { ConnectionRequest } from './entities/connection-request.entity';

@Module({
  imports:[
    forwardRef(() => UserConnectionsModule),
    TypeOrmModule.forFeature(
      [  
        InternalStatus,
        User,
        ConnectionRequest
      ]

    )],
  controllers: [ConnectionRequestController],
  providers: [ConnectionRequestService],
})
export class ConnectionRequestModule {}
