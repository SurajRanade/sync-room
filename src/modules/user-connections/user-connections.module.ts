import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserConnection } from './entities/user-connection.entity';
import { UserConnectionsController } from './user-connections.controller';
import { UserConnectionsService } from './user-connections.service';

@Module({
  imports:[TypeOrmModule.forFeature([UserConnection])],
  controllers: [UserConnectionsController],
  providers: [UserConnectionsService],
  exports:[UserConnectionsService]
})
export class UserConnectionsModule {}
