import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RacesService } from './races.service';
import { Prisma } from '@prisma/client';
import { RaceSchedule } from 'src/@types/globalTypes';


@Controller('track/:trackId/races')
export class RacesController {
  constructor(
    private readonly raceService: RacesService,
  ) {}

  @Post()
  create(
    @Body() createRaceDto: RaceSchedule,
    @Param('trackId') trackId: string
  ) {
    return this.raceService.generateRaces(trackId, createRaceDto);
  }

  @Get()
  findAll() {
    return this.raceService.findAll();
  }

  @Get(':raceId')
  findOne(@Param('raceId') raceId: string) {
    return this.raceService.findOne(raceId);
  }

  @Patch(':raceId')
  update(@Param('raceId') raceId: string, @Body() updateRaceDto: Prisma.RaceUpdateInput) {
    return this.raceService.update(raceId, updateRaceDto);
  }

  @Delete(':raceId')
  remove(@Param('raceId') raceId: string) {
    return this.raceService.remove(raceId);
  }
}
