import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { GuardProfileTokens } from 'src/guards/guardProfileTokens.guard';
import { ApiOkResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { TrackProfileService } from '../services/track-profile.service';
import { RaceCategoriesService } from '../services/race-categories.service';
import { AuthLoginService } from 'src/modules/prisma/authLogin.service';
import { TrackProfileEntity } from 'src/modules/prisma/entities/trackProfile.entity';

@Controller('track-profile')
@ApiTags('track-profile')
export class TrackProfileController {
  constructor(
    private readonly trackProfileService: TrackProfileService,
    private readonly raceCategoriesService: RaceCategoriesService,
    private readonly authLoginService: AuthLoginService
  ) {}

  @Post()
  @ApiCreatedResponse({ type: TrackProfileEntity })
  async create(@Body() createTrackProfileDto: Prisma.TrackProfileCreateInput) {
    return await this.trackProfileService.create(createTrackProfileDto);
  }

  @Get()
  @ApiOkResponse({ type: TrackProfileEntity, isArray: true })
  @UseGuards(GuardProfileTokens)
  async findAll() {
    return await this.trackProfileService.findAll();
  }

  @Get(':trackId')
  @ApiOkResponse({ type: TrackProfileEntity })
  @UseGuards(GuardProfileTokens)
  async findOne(@Param('trackId') trackId: string) {
    return await this.trackProfileService.findOne(trackId);
  }

  @Patch(':trackId')
  @ApiOkResponse({ type: TrackProfileEntity })
  @UseGuards(GuardProfileTokens)
  async update(@Param('trackId') trackId: string, @Body() updateTrackProfileDto: Prisma.TrackProfileUpdateInput) {
    return await this.trackProfileService.update(trackId, updateTrackProfileDto);
  }

  @Delete(':trackId')
  @ApiOkResponse({ type: TrackProfileEntity })
  @UseGuards(GuardProfileTokens)
  async remove(@Param('trackId') trackId: string) {
    return await this.trackProfileService.remove(trackId);
  }

  // Categories
  @Post(':trackId/categories')
  @UseGuards(GuardProfileTokens)
  async createCategory(
    @Body() createTrackProfileDto: Prisma.RaceCategoriesCreateInput,
    @Param('trackId') id: string
  ) {
    return await this.raceCategoriesService.create(id, createTrackProfileDto);
  }

  @Get(':trackId/categories')
  @UseGuards(GuardProfileTokens)
  async findAllCategories(
    @Param('trackId') trackId: string
  ) {
    return await this.raceCategoriesService.findAll(trackId);
  }

  @Get(':trackId/categories/:categoryId')
  @UseGuards(GuardProfileTokens)
  async findOneCategory(@Param('categoryId') categoryId: string) {
    return await this.raceCategoriesService.findOne(categoryId);
  }

  @Patch(':trackId/categories/:categoryId')
  @UseGuards(GuardProfileTokens)
  async updateCategory(@Param('categoryId') categoryId: string, @Body() updateTrackProfileDto: Prisma.RaceCategoriesUpdateInput) {
    return await this.raceCategoriesService.update(categoryId, updateTrackProfileDto);
  }

  @Delete(':trackId/categories/:categoryId')
  @UseGuards(GuardProfileTokens)
  async removeCategory(@Param('categoryId') categoryId: string) {
    return await this.raceCategoriesService.remove(categoryId);
  }

  // Login
  @Post('login')
  async login(
    @Body() body: { email: string, password: string }
  ) {
    return await this.authLoginService.loginAuthTrack(body)
  }
}
