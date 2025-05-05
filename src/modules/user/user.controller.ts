import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { CurrentUser } from '../../commons/decorators/current-user.decorator';
import { UserDto } from '../connection-request/dto/create-connection-request.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('get-friends-to-add')
  @UseGuards(JwtAuthGuard) 
  async getFriendsToAdd(@CurrentUser()user:UserDto) {
    return this.userService.getFriendsToAdd(user);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto:CreateUserDto ) {
    return this.userService.login(loginUserDto);
  }
}
