import { Module } from '@nestjs/common';
import { RacerChatGateway } from './gateways/racer-chat.gateway';
import { RacerChatController } from './controllers/racer-chat.controller';
import { RacerChatService } from './services/racer-chat.service';
import { RacerSocialsController } from './controllers/racer-socials.controller';
import { RacerSocialsService } from './services/racer-socials.service';

@Module({
  controllers: [RacerSocialsController, RacerChatController],
  providers: [RacerSocialsService, RacerChatGateway, RacerChatService],
})
export class RacerSocialsModule {}
