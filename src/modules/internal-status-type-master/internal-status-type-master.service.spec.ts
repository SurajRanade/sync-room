import { Test, TestingModule } from '@nestjs/testing';
import { InternalStatusTypeMasterService } from './internal-status-type-master.service';

describe('InternalStatusTypeMasterService', () => {
  let service: InternalStatusTypeMasterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InternalStatusTypeMasterService],
    }).compile();

    service = module.get<InternalStatusTypeMasterService>(InternalStatusTypeMasterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
