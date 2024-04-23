import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TrackProfileService } from './track-profile.service';
import { Prisma } from '@prisma/client';
import { RaceCategoriesService } from './race-categories.service';

@Controller('track-profile')
export class TrackProfileController {
  constructor(
    private readonly trackProfileService: TrackProfileService,
    private readonly raceCategoriesService: RaceCategoriesService
  ) {}

  @Post()
  create(@Body() createTrackProfileDto: Prisma.TrackProfileCreateInput) {
    return this.trackProfileService.create(createTrackProfileDto);
  }

  @Get()
  findAll() {
    return this.trackProfileService.findAll();
  }

  @Get(':trackId')
  findOne(@Param('trackId') trackId: string) {
    return this.trackProfileService.findOne(trackId);
  }

  @Patch(':trackId')
  update(@Param('trackId') trackId: string, @Body() updateTrackProfileDto: Prisma.TrackProfileUpdateInput) {
    return this.trackProfileService.update(trackId, updateTrackProfileDto);
  }

  @Delete(':trackId')
  remove(@Param('trackId') trackId: string) {
    return this.trackProfileService.remove(trackId);
  }

  // Categories
  @Post(':trackId/categories')
  createCategory(
    @Body() createTrackProfileDto: Prisma.RaceCategoriesCreateInput,
    @Param('trackId') id: string
  ) {
    return this.raceCategoriesService.create(id, createTrackProfileDto);
  }

  @Get(':trackId/categories')
  findAllCategories(
    @Param('trackId') trackId: string
  ) {
    return this.raceCategoriesService.findAll(trackId);
  }

  @Get(':trackId/categories/:categoryId')
  findOneCategory(@Param('categoryId') categoryId: string) {
    return this.raceCategoriesService.findOne(categoryId);
  }

  @Patch(':trackId/categories/:categoryId')
  updateCategory(@Param('categoryId') categoryId: string, @Body() updateTrackProfileDto: Prisma.RaceCategoriesUpdateInput) {
    return this.raceCategoriesService.update(categoryId, updateTrackProfileDto);
  }

  @Delete(':trackId/categories/:categoryId')
  removeCategory(@Param('categoryId') categoryId: string) {
    return this.raceCategoriesService.remove(categoryId);
  }
}
