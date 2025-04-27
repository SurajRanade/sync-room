import { Controller } from '@nestjs/common';
import { UserConnectionsService } from './user-connections.service';

@Controller('user-connections')
export class UserConnectionsController {
  constructor(private readonly userConnectionsService: UserConnectionsService) {}



  

}
