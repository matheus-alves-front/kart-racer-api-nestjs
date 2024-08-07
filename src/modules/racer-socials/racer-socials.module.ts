import { Module } from '@nestjs/common';
import { RacerSocialsService } from './racer-socials.service';
import { RacerSocialsController } from './racer-socials.controller';
import { RacerChatGateway } from './racer-chat/racer-chat.gateway';
import { RacerChatController } from './racer-chat/racer-chat.controller';
import { RacerChatService } from './racer-chat/racer-chat.service';

@Module({
  controllers: [RacerSocialsController, RacerChatController],
  providers: [RacerSocialsService, RacerChatGateway, RacerChatService],
})
export class RacerSocialsModule {}
