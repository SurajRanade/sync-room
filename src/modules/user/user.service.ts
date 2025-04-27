import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { email, phoneNumber, password, name } = createUserDto;

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

  
}