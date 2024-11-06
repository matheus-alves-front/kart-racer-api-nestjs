import { Module } from '@nestjs/common';
import { TrackProfileService } from './services/track-profile.service';
import { RaceCategoriesService } from './services/race-categories.service';
import { RacesService } from './services/races.service';
import { TrackProfileController } from './controllers/track-profile.controller';
import { RacesController } from './controllers/races.controller';
import { RaceController } from './controllers/race.controller';
@Module({
  controllers: [
    TrackProfileController,
    RacesController,
    RaceController
  ],
  providers: [
    TrackProfileService,
    RaceCategoriesService,
    RacesService
  ],
})
export class TrackProfileModule {}
