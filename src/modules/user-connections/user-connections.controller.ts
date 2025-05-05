import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { CurrentUser } from '../../commons/decorators/current-user.decorator';
import { UserDto } from '../connection-request/dto/create-connection-request.dto';
import { UserConnectionsService } from './user-connections.service';

@Controller('user-connections')
export class UserConnectionsController {
  constructor(private readonly userConnectionsService: UserConnectionsService) {}

    @Get('get-user-connections')
    @UseGuards(JwtAuthGuard) 
    async getUserConnections(@CurrentUser()user:UserDto) {
      return this.userConnectionsService.getUserConnections(user);
    }

    




}
