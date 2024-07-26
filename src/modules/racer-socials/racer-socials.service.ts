import { Injectable } from '@nestjs/common';
import { CreateRacerSocialDto } from './dto/create-racer-social.dto';
import { UpdateRacerSocialDto } from './dto/update-racer-social.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RacerSocialsService {
  constructor (
    private readonly prismaService: PrismaService
  ) {}

  async addRacerFriend(
    racerId: string,
    racerFriendId: string
  ) {
    const createSocialFriendship = await this.prismaService.socialFriendship.create({
      data: {
        accepted: false,
        racerFriendId,
        racerId
      }
    })
    return createSocialFriendship;
  }

  async acceptRacerFriend(
    racerId: string,
    racerFriendId: string
  ) {
    return await this.prismaService.socialFriendship.updateMany({
      where: {
        racerId,
        racerFriendId
      }, 
      data: {
        accepted: true
      }
    });
  }

  async deleteFriendship(
    racerId: string,
    racerFriendId: string
  ) {
    return await this.prismaService.socialFriendship.deleteMany({
      where: {
        racerId,
        racerFriendId
      }
    })
  }

  async getAllFriends(racerId: string) {
    return await this.prismaService.socialFriendship.findMany({
      where: {
        racerId,
        accepted: true
      },
      include: {
        racerFriend: true,
        chat: {
          take: 1,
        }
      }
    });
  }

  async getAllFriendRequests(racerId: string) {
    return await this.prismaService.socialFriendship.findMany({
      where: {
        racerId,
        accepted: false
      },
      include: {
        racerFriend: true,
      }
    });
  }
}
