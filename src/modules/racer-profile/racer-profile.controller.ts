import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RacerProfileService } from './racer-profile.service';
import { Prisma } from '@prisma/client';
import { GuardProfileTokens } from 'src/guards/guardProfileTokens.guard';
import { AuthLoginService } from '../prisma/authLogin.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RacerProfileEntity } from '../prisma/entities/racerProfile.entity';

@Controller('racer-profile')
@ApiTags('racer')
export class RacerProfileController {
  constructor(
    private readonly racerProfileService: RacerProfileService,
    private readonly authLoginService: AuthLoginService
  ) {}

  @Post()
  @ApiCreatedResponse({ type: RacerProfileEntity })
  create(@Body() createRacerProfileDto: Prisma.RacerProfileCreateInput) {
    return this.racerProfileService.create(createRacerProfileDto);
  }

  @Get()
  @ApiOkResponse({ type: RacerProfileEntity, isArray: true })
  @UseGuards(GuardProfileTokens)
  findAll() {
    return this.racerProfileService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: RacerProfileEntity })
  @UseGuards(GuardProfileTokens)
  findOne(@Param('id') id: string) {
    return this.racerProfileService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(GuardProfileTokens)
  @ApiOkResponse({ type: RacerProfileEntity })
  update(@Param('id') id: string, @Body() updateRacerProfileDto: Prisma.RacerProfileUpdateInput) {
    return this.racerProfileService.update(id, updateRacerProfileDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: RacerProfileEntity })
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

  @Get(':id/races')
  @ApiOkResponse({ type: RacerProfileEntity })
  @UseGuards(GuardProfileTokens)
  getRacesOfProfile(@Param('id') id: string) {
    return this.racerProfileService.findOne(id);
  }
}

