import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RacesService } from './races.service';
import { Prisma } from '@prisma/client';
import { RaceSchedule } from 'src/@types/globalTypes';
import { GuardProfileTokens } from 'src/guards/guardProfileTokens.guard';


@Controller('track/:trackId/races')
@UseGuards(GuardProfileTokens)
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
  async findAll(@Param('trackId') trackId: string) {
    return await this.raceService.findAll(trackId);
  }

  @Get(':raceId')
  findOne(@Param('raceId') raceId: string) {
    return this.raceService.findOneWithAllRelations(raceId);
  }

  @Patch(':raceId')
  update(@Param('raceId') raceId: string, @Body() updateRaceDto: Prisma.RaceUpdateInput) {
    return this.raceService.update(raceId, updateRaceDto);
  }

  @Delete(':raceId')
  remove(@Param('raceId') raceId: string) {
    return this.raceService.remove(raceId);
  }

  // RACER PROFILES
  @Post(':raceId/addRacer/:racerProfileId')
  racerProfileRegisterToRace(
    @Param('racerProfileId') racerProfileId: string,
    @Param('raceId') raceId: string
  ) {
    return this.raceService.racerProfileEnterRace(raceId, racerProfileId)
  }

  @Post(':raceId/removeRacer/:racerProfileId')
  racerProfileLeftTheRace(
    @Param('racerProfileId') racerProfileId: string,
    @Param('raceId') raceId: string
  ) {
    return this.raceService.racerProfileOutRace(raceId, racerProfileId)
  }

  @Post(':raceId/changeHost/from/:oldHost/to/:newHost')
  changeRacerHostOfRace(
    @Param('raceId') raceId: string,
    @Param('oldHost') oldHost: string,
    @Param('newHost') newHost: string,
  ) {
    return this.raceService.changeRacerHostProfile(oldHost, newHost, raceId)
  }

  // Race Categories
  @Post(':raceId/addCategory/:categoryId')
  addCategoryToRace(
    @Param('raceId') raceId: string,
    @Param('categoryId') categoryId: string,
    @Param('trackId') trackId: string
  ) {
    return this.raceService.addCategoryToRace(raceId, categoryId, trackId)
  }

  @Post(':raceId/changeCategory/from/:oldCategoryId/to/:newCategoryId')
  chageCategoryToRace(
    @Param('raceId') raceId: string,
    @Param('oldCategoryId') oldCategoryId: string,
    @Param('newCategoryId') newCategoryId: string,
  ) {
    return this.raceService.changeCategoryToRace(oldCategoryId, newCategoryId, raceId)
  }
}
