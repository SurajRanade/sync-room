import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionRequest } from '../connection-request/entities/connection-request.entity';
import { UserConnection } from '../user-connections/entities/user-connection.entity';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports:[TypeOrmModule.forFeature([User,UserConnection,ConnectionRequest])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
