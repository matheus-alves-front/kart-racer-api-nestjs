import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RacesService } from './races.service';
import { GuardProfileTokens } from 'src/guards/guardProfileTokens.guard';


@Controller('race')
@UseGuards(GuardProfileTokens)
export class RaceController {
  constructor(
    private readonly raceService: RacesService,
  ) {}

  @Get(':id')
  async findUniqueWithAllRelations(@Param('id') raceId: string) {
    return await this.raceService.findOneWithAllRelations(raceId);
  }
}
