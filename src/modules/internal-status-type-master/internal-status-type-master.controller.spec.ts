import { Test, TestingModule } from '@nestjs/testing';
import { InternalStatusTypeMasterController } from './internal-status-type-master.controller';
import { InternalStatusTypeMasterService } from './internal-status-type-master.service';

describe('InternalStatusTypeMasterController', () => {
  let controller: InternalStatusTypeMasterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InternalStatusTypeMasterController],
      providers: [InternalStatusTypeMasterService],
    }).compile();

    controller = module.get<InternalStatusTypeMasterController>(InternalStatusTypeMasterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
