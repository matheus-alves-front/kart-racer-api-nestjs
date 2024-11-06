import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
@Injectable()
export class RacerChatService {
  constructor (
    private readonly prismaService: PrismaService
  ) {}

  async getConnectChat(
    friendshipId: string
  ) {
    const getFriendshipWithChat = await this.prismaService.socialFriendship.findUnique({
      where: {
        id: friendshipId
      }, 
      include: {
        chat: {
          take: 30
        },
        racerFriend: true
      }
    })

    const getUserFromUserId = await this.prismaService.racerProfile.findUnique({
      where: {
        id: getFriendshipWithChat.racerId
      }
    })
    return {
      ...getFriendshipWithChat,
      racer: getUserFromUserId
    };
  }

  async loadMoreChat(
    friendshipId: string
  ) {
    const getMoreChat = await this.prismaService.chat.findMany({
      where: {
        chatWithFriendshipId: friendshipId
      }, 
      skip: 30
    })
    return getMoreChat;
  }


  async createSendMessage(
    senderId: string,
    friendshipId: string,
    body: { message: string }
  ) {
    const createNewChatMessage = await this.prismaService.chat.create({
      data: {
        ...body,
        senderId,
        chatWithFriendshipId: friendshipId
      }
    })
    return createNewChatMessage;
  }
}
