import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RacerProfileModule } from './racer-profile/racer-profile.module';
import { PrismaModule } from './prisma/prisma.module';
import { TrackProfileModule } from './track-profile/track-profile.module';

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
