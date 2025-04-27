import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
 
}
