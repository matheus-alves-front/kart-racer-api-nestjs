import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { RacerProfileService } from './racer-profile.service';
import { Prisma } from '@prisma/client';
import { GuardProfileTokens } from 'src/guards/guardProfileTokens.guard';
import { AuthLoginService } from '../prisma/authLogin.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RacerProfileEntity } from '../prisma/entities/racerProfile.entity';
import { RacerProfileQueryParams } from './dtos/racerProfile.dto';

@Controller('racer-profile')
@ApiTags('racer')
export class RacerProfileController {
  constructor(
    private readonly racerProfileService: RacerProfileService,
    private readonly authLoginService: AuthLoginService
  ) {}

  @Post()
  @ApiCreatedResponse({ type: RacerProfileEntity })
  async create(@Body() createRacerProfileDto: Prisma.RacerProfileCreateInput) {
    return await this.racerProfileService.create(createRacerProfileDto);
  }

  @Get()
  @ApiOkResponse({ type: RacerProfileEntity, isArray: true })
  @UseGuards(GuardProfileTokens)
  async findAll(
    @Query() params: RacerProfileQueryParams
  ) {
    return await this.racerProfileService.findAll(params);
  }

  @Get(':id')
  @ApiOkResponse({ type: RacerProfileEntity })
  @UseGuards(GuardProfileTokens)
  async findOne(@Param('id') id: string) {
    return await this.racerProfileService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(GuardProfileTokens)
  @ApiOkResponse({ type: RacerProfileEntity })
  async update(@Param('id') id: string, @Body() updateRacerProfileDto: Prisma.RacerProfileUpdateInput) {
    return await this.racerProfileService.update(id, updateRacerProfileDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: RacerProfileEntity })
  async remove(@Param('id') id: string) {
    return await this.racerProfileService.remove(id);
  }

  @Post('login')
  async login(
    @Body() body: { whatsapp: string, password: string }
  ) {
    return await this.authLoginService.loginAuthRacer(body)
  }

  @Get(':id/races')
  @ApiOkResponse({ type: RacerProfileEntity })
  @UseGuards(GuardProfileTokens)
  async getRacesOfProfile(@Param('id') id: string) {
    return await this.racerProfileService.findOne(id);
  }
}

