import { Test, TestingModule } from '@nestjs/testing';
import { InternalStatusMasterController } from './internal-status-master.controller';
import { InternalStatusMasterService } from './internal-status-master.service';

describe('InternalStatusMasterController', () => {
  let controller: InternalStatusMasterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InternalStatusMasterController],
      providers: [InternalStatusMasterService],
    }).compile();

    controller = module.get<InternalStatusMasterController>(InternalStatusMasterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
