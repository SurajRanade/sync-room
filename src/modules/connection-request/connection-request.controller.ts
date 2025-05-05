import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { CurrentUser } from '../../commons/decorators/current-user.decorator';
import { ConnectionRequestService } from './connection-request.service';
import { CreateConnectionRequestDto, UserDto } from './dto/create-connection-request.dto';

@Controller('connection-request')
export class ConnectionRequestController {
  constructor(private readonly connectionRequestService: ConnectionRequestService) { }

  @Get()
  @UseGuards(JwtAuthGuard) 
  async getUser(
    @CurrentUser() user: UserDto,
  ) {
    return this.connectionRequestService.getUser(user);
  }

  @Get('accept')
  @UseGuards(JwtAuthGuard)
  async acceptConnectionRequest(
    @Query('requestId') requestId: number
  ) {
    return this.connectionRequestService.acceptConnectionRequest(requestId);
  }
  @Get('reject')
  @UseGuards(JwtAuthGuard)
  async rejectConnectionRequest(
    @Query('requestId') requestId: number
  ) {
    return this.connectionRequestService.rejectConnectionRequest(requestId);
  }

  @Get('get-users-pending-requests')
  @UseGuards(JwtAuthGuard) 
  async getUsersPendingRequest(@CurrentUser()user:UserDto) {
    return this.connectionRequestService.getUsersPendingRequest(user);
  }


  @Post('send')
  @UseGuards(JwtAuthGuard)
  async sendConnectionRequest(
    @Body() createConnectionRequestDto: CreateConnectionRequestDto,
    @CurrentUser() user: UserDto,
  ) {
    return this.connectionRequestService.sendConnectionRequest(user, createConnectionRequestDto);
  }




}
