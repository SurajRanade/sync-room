import { Test, TestingModule } from '@nestjs/testing';
import { InternalStatusMasterService } from './internal-status-master.service';

describe('InternalStatusMasterService', () => {
  let service: InternalStatusMasterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InternalStatusMasterService],
    }).compile();

    service = module.get<InternalStatusMasterService>(InternalStatusMasterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
