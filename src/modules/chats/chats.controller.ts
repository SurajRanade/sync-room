import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { CurrentUser } from '../../commons/decorators/current-user.decorator';
import { UserDto } from '../connection-request/dto/create-connection-request.dto';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}
  
    @Get('get-user-chats')
    @UseGuards(JwtAuthGuard) 
    async getUsersChat(@CurrentUser()user:UserDto, @Query('recieverId') recieverId: number) {
      return this.chatsService.getUsersChat(user,recieverId);
    }



    @Post('send-message')
    @UseGuards(JwtAuthGuard) 
    async sendMessageToUser(@CurrentUser()user:UserDto, @Body()createChatDto:CreateChatDto) {
      return this.chatsService.sendMessageToUser(user,createChatDto);
    }
  

}
