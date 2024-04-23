import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrackProfileService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTrackProfileDto: Prisma.TrackProfileCreateInput) {
    return await this.prismaService.trackProfile.create({
      data: createTrackProfileDto
    });
  }

  async findAll() {
    return await this.prismaService.trackProfile.findMany({
      include: {
        categories: true,
        trackRecords: true,
      }
    });
  }

  async findOne(id: string) {
    return await this.prismaService.trackProfile.findUnique({
      where: {
        id
      },
      include: {
        categories: true,
        trackRecords: true,
        racersProfiles: true
      }
    });
  }

  async update(id: string, updateTrackProfileDto: Prisma.TrackProfileUpdateInput) {
    return await this.prismaService.trackProfile.update({
      where: {
        id
      },
      data: updateTrackProfileDto
    });
  }

  async remove(id: string) {
    return await this.prismaService.trackProfile.delete({
      where: {
        id
      }
    })
  }
}
