import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { In, Not, Repository } from 'typeorm';
import { UserDto } from '../connection-request/dto/create-connection-request.dto';
import { ConnectionRequest } from '../connection-request/entities/connection-request.entity';
import { UserConnection } from '../user-connections/entities/user-connection.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserConnection)
    private readonly userConnectionRepository: Repository<UserConnection>,

    @InjectRepository(ConnectionRequest)
    private readonly connectionRequestRepository: Repository<ConnectionRequest>,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { email, phoneNumber, password, name,status } = createUserDto;

    const existingUser = await this.userRepository.findOne({ where: [{ email }, { phoneNumber }] });
    if (existingUser) {
      throw new BadRequestException('User already exists with given email or phone number');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      email,
      phoneNumber,
      password: hashedPassword,
      name,
      status
    });

    await this.userRepository.save(user);

    return { message: 'User registered successfully' };
  }

  async login(loginUserDto: CreateUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid email or password');
    }

    // Use ConfigService instead of process.env directly
    const jwtSecret = this.configService.get<string>('JWT_SECRET');
    
    const payload = { sub: user.userId, email: user.email };
    const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

    return { access_token: token };
  }


  //This Function Return an array of employee Object which User can add;
  async getFriendsToAdd(user: UserDto) {
    const userId = user.userId;
  
    // Step 1: Get current friends
    const currentFriendIds = await this.getLoggedInUsersFriendIds(userId);
  
    // Step 2: Get pending requests (both sent and received)
    const pendingRequests = await this.connectionRequestRepository.find({
      where: [
        { sender: { userId } },
        { receiver: { userId } }
      ],
      relations: ['sender', 'receiver'],
      select: {
        sender: { userId: true },
        receiver: { userId: true }
      }
    });
  
    const pendingIds = pendingRequests.flatMap(req => [
      req.sender.userId === userId ? req.receiver.userId : req.sender.userId
    ]);
  
    // Step 3: Combine all to exclude (friends, pending requests, and self)
    const excludeIds = Array.from(new Set([...currentFriendIds, ...pendingIds, userId]));
  
    // Step 4: Query for people you may know
    const friendsToAdd = await this.userRepository.find({
      where: {
        userId: Not(In(excludeIds))
      },
      select: {
        userId: true,
        name: true,
        email: true,
        status: true,
        avatarUrl: true
      }
    });
  
    return friendsToAdd;
  }
  
    //This Function returns the loggedIn Users Friend's Ids
    async getLoggedInUsersFriendIds(userId:number){
     let availableFriends= await this.userConnectionRepository.find({
        relations:{
          user:true,
          connectedUser:true
        },
        where:{
          user:{
            userId:userId
          }
        },
        select:{
          connectionId:true,
          user:{
            userId:true,
          },
          connectedUser:{
            userId:true
          }
        }
      })

      let userfriendId = availableFriends.map((item)=>item.connectedUser.userId)

      return userfriendId
    
    }

  
}