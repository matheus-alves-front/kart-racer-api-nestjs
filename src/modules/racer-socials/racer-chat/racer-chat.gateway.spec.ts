import { Test, TestingModule } from '@nestjs/testing';
import { RacerChatGateway } from './racer-chat.gateway';

describe('RacerChatGateway', () => {
  let gateway: RacerChatGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RacerChatGateway],
    }).compile();

    gateway = module.get<RacerChatGateway>(RacerChatGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
