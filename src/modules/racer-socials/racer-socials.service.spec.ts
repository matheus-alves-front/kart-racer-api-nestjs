import { Test, TestingModule } from '@nestjs/testing';
import { RacerSocialsService } from './racer-socials.service';

describe('RacerSocialsService', () => {
  let service: RacerSocialsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RacerSocialsService],
    }).compile();

    service = module.get<RacerSocialsService>(RacerSocialsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
