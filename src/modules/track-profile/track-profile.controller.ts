import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TrackProfileService } from './track-profile.service';
import { Prisma } from '@prisma/client';
import { RaceCategoriesService } from './race-categories.service';
import { GuardProfileTokens } from 'src/guards/guardProfileTokens.guard';
import { ApiOkResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { TrackProfileEntity } from '../prisma/entities/trackProfile.entity';

@Controller('track-profile')
@ApiTags('track-profile')
export class TrackProfileController {
  constructor(
    private readonly trackProfileService: TrackProfileService,
    private readonly raceCategoriesService: RaceCategoriesService
  ) {}

  @Post()
  @ApiCreatedResponse({ type: TrackProfileEntity })
  create(@Body() createTrackProfileDto: Prisma.TrackProfileCreateInput) {
    return this.trackProfileService.create(createTrackProfileDto);
  }

  @Get()
  @ApiOkResponse({ type: TrackProfileEntity, isArray: true })
  @UseGuards(GuardProfileTokens)
  findAll() {
    return this.trackProfileService.findAll();
  }

  @Get(':trackId')
  @ApiOkResponse({ type: TrackProfileEntity })
  @UseGuards(GuardProfileTokens)
  findOne(@Param('trackId') trackId: string) {
    return this.trackProfileService.findOne(trackId);
  }

  @Patch(':trackId')
  @ApiOkResponse({ type: TrackProfileEntity })
  @UseGuards(GuardProfileTokens)
  update(@Param('trackId') trackId: string, @Body() updateTrackProfileDto: Prisma.TrackProfileUpdateInput) {
    return this.trackProfileService.update(trackId, updateTrackProfileDto);
  }

  @Delete(':trackId')
  @ApiOkResponse({ type: TrackProfileEntity })
  @UseGuards(GuardProfileTokens)
  remove(@Param('trackId') trackId: string) {
    return this.trackProfileService.remove(trackId);
  }

  // Categories
  @Post(':trackId/categories')
  @UseGuards(GuardProfileTokens)
  createCategory(
    @Body() createTrackProfileDto: Prisma.RaceCategoriesCreateInput,
    @Param('trackId') id: string
  ) {
    return this.raceCategoriesService.create(id, createTrackProfileDto);
  }

  @Get(':trackId/categories')
  @UseGuards(GuardProfileTokens)
  findAllCategories(
    @Param('trackId') trackId: string
  ) {
    return this.raceCategoriesService.findAll(trackId);
  }

  @Get(':trackId/categories/:categoryId')
  @UseGuards(GuardProfileTokens)
  findOneCategory(@Param('categoryId') categoryId: string) {
    return this.raceCategoriesService.findOne(categoryId);
  }

  @Patch(':trackId/categories/:categoryId')
  @UseGuards(GuardProfileTokens)
  updateCategory(@Param('categoryId') categoryId: string, @Body() updateTrackProfileDto: Prisma.RaceCategoriesUpdateInput) {
    return this.raceCategoriesService.update(categoryId, updateTrackProfileDto);
  }

  @Delete(':trackId/categories/:categoryId')
  @UseGuards(GuardProfileTokens)
  removeCategory(@Param('categoryId') categoryId: string) {
    return this.raceCategoriesService.remove(categoryId);
  }
}
