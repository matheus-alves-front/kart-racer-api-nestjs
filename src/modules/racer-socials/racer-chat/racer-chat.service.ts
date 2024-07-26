import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class RacerChatService {
  constructor (
    private readonly prismaService: PrismaService
  ) {}

  async getConnectChat(
    friendshipId: string
  ) {
    const getChat = await this.prismaService.chat.findMany({
      where: {
        chatWithFriendshipId: friendshipId
      }, 
      take: 30
    })
    return getChat;
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
