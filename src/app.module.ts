import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { ChatsModule } from "./modules/chats/chats.module";
import { Chat } from "./modules/chats/entities/chat.entity";
import { ConnectionRequestModule } from "./modules/connection-request/connection-request.module";
import { ConnectionRequest } from "./modules/connection-request/entities/connection-request.entity";
import { InternalStatus } from "./modules/internal-status-master/entities/internal-status-master.entity";
import { InternalStatusMasterModule } from "./modules/internal-status-master/internal-status-master.module";
import { InternalStatusType } from "./modules/internal-status-type-master/entities/internal-status-type-master.entity";
import { InternalStatusTypeMasterModule } from "./modules/internal-status-type-master/internal-status-type-master.module";
import { UserConnection } from "./modules/user-connections/entities/user-connection.entity";
import { UserConnectionsModule } from "./modules/user-connections/user-connections.module";
import { User } from "./modules/user/entities/user.entity";
import { UserModule } from "./modules/user/user.module";

let modules = [UserModule,AuthModule,ConnectionRequestModule
  ,UserConnectionsModule,InternalStatusTypeMasterModule,InternalStatusMasterModule,
  ChatsModule
];

let entities = [
  User,UserConnection,ConnectionRequest,InternalStatusType,InternalStatus,Chat
];

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,
      envFilePath: '.env'
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mariadb',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: entities,
        synchronize: true, // auto create tables in dev (disable in prod)
      }),
    }),
    ...modules,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}