import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class RacerProfileService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createRacerProfileDto: Prisma.RacerProfileCreateInput) {
    return await this.prismaService.racerProfile.create({
      data: createRacerProfileDto
    });
  }

  async findAll() {
    return await this.prismaService.racerProfile.findMany();
  }

  async findOne(id: string) {
    return await this.prismaService.racerProfile.findUnique({
      where: {
        id
      },
      include: {
        hostedRaces: true,
        races: true,
        trackRecords: true,
        tracksUnlocked: true,
      }
    });
  }

  async update(id: string, updateRacerProfileDto: Prisma.RacerProfileUpdateInput) {
    return await this.prismaService.racerProfile.update({
      where: {
        id
      },
      data: updateRacerProfileDto
    });
  }

  async remove(id: string) {
    return await this.prismaService.racerProfile.delete({
      where: {
        id
      }
    })
  }
}
