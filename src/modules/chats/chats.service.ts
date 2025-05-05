import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { UserDto } from '../connection-request/dto/create-connection-request.dto';
import { User } from '../user/entities/user.entity';
import { CreateChatDto } from './dto/create-chat.dto';
import { Chat } from './entities/chat.entity';

@Injectable()
export class ChatsService {
 constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
  ) { }


  async getUsersChat(user:UserDto,recieverId:number){
    let userId = user.userId;

    let userChats = await this.chatRepository.find({
      relations:{
        sender:true,
        receiver:true
      },
      where:{
        sender:{
          userId:In([userId,recieverId])
        },
        receiver:{
          userId:In([userId,recieverId])
        }
      }
      ,select:{
        chatId:true,
        message:true,
        sender:{
          userId:true,
          name:true,
          avatarUrl:true,
          status:true
        },
        receiver:{
          userId:true,
          name:true,
          avatarUrl:true,
          status:true
        }
      }
    })

    return userChats
  }

  async sendMessageToUser(user:UserDto,createChatDto:CreateChatDto){
    let userId = user.userId
    let chat =  this.chatRepository.create({
      sender:{userId:userId}as User,
      receiver:{userId:createChatDto.recieverId}as User,
      message:createChatDto.message,
      createdAt:new Date()
    })

return this.chatRepository.save(chat)
  }
}
