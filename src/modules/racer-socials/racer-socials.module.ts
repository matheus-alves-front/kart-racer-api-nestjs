import { Module } from '@nestjs/common';
import { RacerSocialsService } from './racer-socials.service';
import { RacerSocialsController } from './racer-socials.controller';
import { RacerChatGateway } from './racer-chat/racer-chat.gateway';

@Module({
  controllers: [RacerSocialsController],
  providers: [RacerSocialsService, RacerChatGateway],
})
export class RacerSocialsModule {}
