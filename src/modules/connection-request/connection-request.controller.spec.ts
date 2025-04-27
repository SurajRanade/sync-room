import { Test, TestingModule } from '@nestjs/testing';
import { ConnectionRequestController } from './connection-request.controller';
import { ConnectionRequestService } from './connection-request.service';

describe('ConnectionRequestController', () => {
  let controller: ConnectionRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConnectionRequestController],
      providers: [ConnectionRequestService],
    }).compile();

    controller = module.get<ConnectionRequestController>(ConnectionRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
