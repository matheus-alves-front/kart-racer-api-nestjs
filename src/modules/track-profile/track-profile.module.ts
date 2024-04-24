import { Module } from '@nestjs/common';
import { TrackProfileService } from './track-profile.service';
import { TrackProfileController } from './track-profile.controller';
import { RaceCategoriesService } from './race-categories.service';
import { RacesService } from './races.service';
import { RacesController } from './races.controller';

@Module({
  controllers: [
    TrackProfileController,
    RacesController
  ],
  providers: [
    TrackProfileService,
    RaceCategoriesService,
    RacesService
  ],
})
export class TrackProfileModule {}
