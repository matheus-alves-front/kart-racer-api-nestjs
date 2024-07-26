import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class RacerChatService {
  constructor (
    private readonly prismaService: PrismaService
  ) {}

  async getConnectChat(
    racerId: string,
    racerFriendId: string
  ) {
    const getFriendShip = await this.prismaService.socialFriendship.findFirst({
      where: {
        racerId,
        racerFriendId
      }, 
      include: {
        chat: {
          take: 30
        }
      }
    })
    return getFriendShip.chat;
  }


  async createSendMessage(
    senderId: string,
    friendshipId: string,
    body: Prisma.ChatCreateInput
  ) {
    const getFriendShip = await this.prismaService.socialFriendship.findUnique({
      where: {
        id: friendshipId
      }
    })

    const createNewChatMessage = await this.prismaService.chat.create({
      data: {
        ...body,
        senderId,
        chatWithFriendship: {
          connect: {
            id: getFriendShip.racerFriendId
          }
        }
      }
    })
    return createNewChatMessage;
  }
}
