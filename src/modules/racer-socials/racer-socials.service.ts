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
    const thisFriendshipExists = await this.prismaService.socialFriendship.findFirst({
      where: {
        OR: [
          {
            racerFriendId: racerFriendId,
            racerId: racerId
          },
          {
            racerFriendId: racerId,
            racerId: racerFriendId
          }
        ]
      }
    })

    if (thisFriendshipExists) return thisFriendshipExists

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
    const updateFriendship = await this.prismaService.socialFriendship.updateMany({
      where: {
        OR: [
          {
            racerId: racerId,
            racerFriendId: racerFriendId
          },
          {
            racerId: racerFriendId,
            racerFriendId: racerId
          }
        ]
      }, 
      data: {
        accepted: true
      }
    });

    return updateFriendship
  }

  async deleteFriendship(
    racerId: string,
    racerFriendId: string
  ) {
    return await this.prismaService.socialFriendship.deleteMany({
      where: {
        OR: [
          {
            racerId: racerId,
            racerFriendId: racerFriendId
          },
          {
            racerId: racerFriendId,
            racerFriendId: racerId
          }
        ]
      }
    })
  }

  async getAllFriends(racerId: string) {
    const friendships = await this.prismaService.socialFriendship.findMany({
      where: {
        OR: [
          {
            racerId: racerId,
          },
          {
            racerFriendId: racerId
          }
        ]
      },
      include: {
        racerFriend: true,
        chat: {
          take: 1,
        }
      }
    });

    const [friendshipWithProfiles] = await Promise.all(friendships.map(async (friendship) => {
      const { 
        racerId: actualRacerId,
      } = friendship

      const racerMissing = await this.prismaService.racerProfile.findUnique({
        where: {
          id: actualRacerId
        }
      })
      return {
        ...friendship,
        racer: racerMissing
      }
    })) 

    return friendshipWithProfiles ?? []
  }

  async getAllFriendRequests(racerId: string) {
    const friendRequests = await this.prismaService.socialFriendship.findMany({
      where: {
        OR: [
          {
            racerFriendId: racerId
          }
        ],
        accepted: false
      },
      include: {
        racerFriend: true,
      }
    });

    const [friendshipRequestsWithProfiles] = await Promise.all(friendRequests.map(async (friendship) => {
      const { 
        racerId: actualRacerId,
      } = friendship

      const racerMissing = await this.prismaService.racerProfile.findUnique({
        where: {
          id: actualRacerId
        }
      })
      return {
        ...friendship,
        racer: racerMissing
      }
    })) 

    return friendshipRequestsWithProfiles ?? []
  }
}
