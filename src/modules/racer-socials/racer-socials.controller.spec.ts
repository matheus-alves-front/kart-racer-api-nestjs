import { Test, TestingModule } from '@nestjs/testing';
import { RacerSocialsController } from './racer-socials.controller';
import { RacerSocialsService } from './racer-socials.service';

describe('RacerSocialsController', () => {
  let controller: RacerSocialsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RacerSocialsController],
      providers: [RacerSocialsService],
    }).compile();

    controller = module.get<RacerSocialsController>(RacerSocialsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
