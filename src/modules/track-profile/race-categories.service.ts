import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class RaceCategoriesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
      trackId: string,
      createRaceCategoriesDto: Prisma.RaceCategoriesCreateInput
  ) {
    return await this.prismaService.raceCategories.create({
      data: {
        ...createRaceCategoriesDto,
        trackProfile: {
          connect: {
            id: trackId
          }
        }
      },
    });
  }

  async findAll(trackId: string) {
    return await this.prismaService.raceCategories.findMany({
      where: {
        trackProfileId: trackId
      }
    });
  }

  async findOne(id: string) {
    return await this.prismaService.raceCategories.findUnique({
      where: {
        id
      }
    });
  }

  async update(id: string, updateRaceCategoriesDto: Prisma.RaceCategoriesUpdateInput) {
    return await this.prismaService.raceCategories.update({
      where: {
        id
      },
      data: updateRaceCategoriesDto
    });
  }

  async remove(id: string) {
    return await this.prismaService.raceCategories.delete({
      where: {
        id
      }
    })
  }
}
