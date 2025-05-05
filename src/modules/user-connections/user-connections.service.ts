import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from '../connection-request/dto/create-connection-request.dto';
import { User } from '../user/entities/user.entity';
import { CreateUserConnectionDto } from './dto/create-user-connection.dto';
import { UserConnection } from './entities/user-connection.entity';

@Injectable()
export class UserConnectionsService {
  constructor(
   
     @InjectRepository(UserConnection)
     private readonly userConnectionRepo: Repository<UserConnection>,
   ) {}


   async addConnections(createUserConnectionDto:CreateUserConnectionDto){
    let{userId,connectedUserId} = createUserConnectionDto;
    let first =this.userConnectionRepo.create({
      user:{userId:userId}as User,
      connectedUser:{userId:connectedUserId}as User
    })


    let second =this.userConnectionRepo.create({
      user:{userId:connectedUserId}as User,
      connectedUser:{userId:userId}as User
    })


    await this.userConnectionRepo.save([first, second]);

    return { message: 'Connection established successfully!' };

  }

  async getUserConnections(user:UserDto){
    let userId = user.userId;

    let userconnections = await this.userConnectionRepo.find({
      relations:{
        user:true,
        connectedUser:true,
      },
      where:{
        user:{
          userId:userId
        }
      },
      select:{
        connectionId:true,
        user:{
          userId:true
        },
        connectedUser:{
          userId:true,
          name:true,
          status:true,
          avatarUrl:true,
          email:true,
        }
      }
    })

    return userconnections
  }
 
}
