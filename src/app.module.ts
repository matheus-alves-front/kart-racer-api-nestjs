import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RacerProfileModule } from './modules/racer-profile/racer-profile.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { TrackProfileModule } from './modules/track-profile/track-profile.module';

@Module({
  imports: [
    PrismaModule,
    RacerProfileModule,
    TrackProfileModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
