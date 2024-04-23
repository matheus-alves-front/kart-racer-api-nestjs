import { Module } from '@nestjs/common';
import { RacerProfileService } from './racer-profile.service';
import { RacerProfileController } from './racer-profile.controller';

@Module({
  controllers: [RacerProfileController],
  providers: [RacerProfileService],
})
export class RacerProfileModule {}
