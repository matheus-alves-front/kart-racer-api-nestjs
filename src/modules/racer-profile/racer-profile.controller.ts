import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RacerProfileService } from './racer-profile.service';
import { Prisma } from '@prisma/client';
import { GuardProfileTokens } from 'src/guards/guardProfileTokens.guard';
import { AuthLoginService } from '../prisma/authLogin.service';

@Controller('racer-profile')
export class RacerProfileController {
  constructor(
    private readonly racerProfileService: RacerProfileService,
    private readonly authLoginService: AuthLoginService
  ) {}

  @Post()
  create(@Body() createRacerProfileDto: Prisma.RacerProfileCreateInput) {
    return this.racerProfileService.create(createRacerProfileDto);
  }

  @Get()
  @UseGuards(GuardProfileTokens)
  findAll() {
    return this.racerProfileService.findAll();
  }

  @Get(':id')
  @UseGuards(GuardProfileTokens)
  findOne(@Param('id') id: string) {
    return this.racerProfileService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(GuardProfileTokens)
  update(@Param('id') id: string, @Body() updateRacerProfileDto: Prisma.RacerProfileUpdateInput) {
    return this.racerProfileService.update(id, updateRacerProfileDto);
  }

  @Delete(':id')
  @UseGuards(GuardProfileTokens)
  remove(@Param('id') id: string) {
    return this.racerProfileService.remove(id);
  }

  @Post('login')
  login(
    @Body() body: { whatsapp: string, password: string }
  ) {
    return this.authLoginService.loginAuthRacer(body)
  }
}
