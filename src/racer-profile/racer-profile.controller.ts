import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RacerProfileService } from './racer-profile.service';
import { Prisma } from '@prisma/client';

@Controller('racer-profile')
export class RacerProfileController {
  constructor(private readonly racerProfileService: RacerProfileService) {}

  @Post()
  create(@Body() createRacerProfileDto: Prisma.RacerProfileCreateInput) {
    return this.racerProfileService.create(createRacerProfileDto);
  }

  @Get()
  findAll() {
    return this.racerProfileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.racerProfileService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRacerProfileDto: Prisma.RacerProfileUpdateInput) {
    return this.racerProfileService.update(id, updateRacerProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.racerProfileService.remove(id);
  }
}
