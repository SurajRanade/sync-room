import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { REQUEST_STATUS } from '../../enums/enum';
import { InternalStatus } from '../internal-status-master/entities/internal-status-master.entity';
import { CreateUserConnectionDto } from '../user-connections/dto/create-user-connection.dto';
import { UserConnectionsService } from '../user-connections/user-connections.service';
import { User } from '../user/entities/user.entity';
import { CreateConnectionRequestDto, UserDto } from './dto/create-connection-request.dto';
import { ConnectionRequest } from './entities/connection-request.entity';
@Injectable()
export class ConnectionRequestService {


  constructor(
    @InjectRepository(ConnectionRequest)
    private connectionRequestRepository: Repository<ConnectionRequest>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(InternalStatus)
    private internalStatusRepository: Repository<InternalStatus>,

    @Inject(forwardRef(() => UserConnectionsService))
    private readonly userConnectionsService: UserConnectionsService,
  ) { }

  // Method to send a connection request
  async sendConnectionRequest(user: UserDto, dto: CreateConnectionRequestDto) {
    // Find sender user from database based on senderId (logged-in user)
    const sender = await this.userRepository.findOne({ where: { userId: user.userId } });
    if (!sender) {
      throw new NotFoundException('Sender not found');
    }

    // Find receiver user from database based on receiverId
    const receiver = await this.userRepository.findOne({ where: { userId: dto.receiverId } })
    if (!receiver) {
      throw new NotFoundException('Receiver not found');
    }

    // Fetch "Pending" internal status
    const pendingStatus = await this.internalStatusRepository.findOne({
      where: { internalStatusId: REQUEST_STATUS.Pending },
    });
    if (!pendingStatus) {
      throw new NotFoundException('Pending status not found');
    }

    // Create new connection request with status "Pending"
    const newConnectionRequest = this.connectionRequestRepository.create({
      requestStatus: { internalStatusId: REQUEST_STATUS.Pending } as InternalStatus,
      sender: { userId: user.userId } as User,
      receiver: { userId: dto.receiverId } as User
    });

    // Save the new connection request to the database
    return this.connectionRequestRepository.save(newConnectionRequest);
  }



  async getUser(user: UserDto) {


    // Extract the userId and email directly from the user object
    const userId = user?.userId; // Make sure your UserDto has an id property
    const email = user?.email;


    return { userId, email };
  }



  async acceptConnectionRequest(requestId: number) {
    let request = await this.connectionRequestRepository.findOne({
      relations:{
        sender:true,
        receiver:true
      },
      where: {
        requestId: requestId
      }
    })

    if (!request) {
      throw new NotFoundException('Request not found');
    }

    let result = await this.connectionRequestRepository.update(requestId, {
      requestStatus: {
        internalStatusId: REQUEST_STATUS.Accepted
      } as InternalStatus
    })

    if (result.affected > 0) {
      //If Request is accepted create connection 
      let connection = await this.createConnection(request) 
      return {
        status: 'Success'
      }
    }

  }

  async rejectConnectionRequest(requestId: number) {
    let request = await this.connectionRequestRepository.findOne({
      where: {
        requestId: requestId
      }
    })

    if (!request) {
      throw new NotFoundException('Request not found');
    }

    let result = await this.connectionRequestRepository.update(requestId, {
      requestStatus: {
        internalStatusId: REQUEST_STATUS.Rejected
      } as InternalStatus
    })

    if (result.affected > 0) {
      return {
        status: 'Success'
      }
    }

  }

  async createConnection(connectionRequest:ConnectionRequest){
    let senderId = connectionRequest.sender.userId;
    let receiverId = connectionRequest.receiver.userId;

    if(senderId && receiverId ){
      let createUserConnectionDto:CreateUserConnectionDto={
        userId: senderId,
        connectedUserId: receiverId
      }
      await this.userConnectionsService.addConnections(createUserConnectionDto)
    }
  }


//This Functions return the 
  async getUsersPendingRequest(user:UserDto){
    let userId = user.userId
    let usersPendingRequest =await this.connectionRequestRepository.find({
      relations:{
        sender:true
      },
      where:{
        receiver:{
          userId:userId
        },
        requestStatus:{
          internalStatusId:REQUEST_STATUS.Pending
        }
      },
      select:{
        requestId:true,
        createdAt:true,
        updatedAt:true,
        sender:{
          userId:true,
          name:true,
          status:true,
          avatarUrl:true,
          email:true
        }
      }
    })

    return usersPendingRequest
  }
}
