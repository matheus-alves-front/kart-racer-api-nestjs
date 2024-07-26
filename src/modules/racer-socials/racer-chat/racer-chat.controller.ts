import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RacerChatGateway } from './racer-chat.gateway';
import { Prisma } from '@prisma/client';


@Controller('racer/:racerId/racer-socials')
export class RacerChatController {
  constructor(private readonly chatGateway: RacerChatGateway) {}

  @Post('chat/:racerFriendId')
  addFriend(
    @Param('racerFriendId') racerFriendId: string,
    @Param('racerId') racerId: string,
    @Body() body: Prisma.ChatCreateInput
  ) {
    return this.chatGateway.onSendMessage(body, racerId, racerFriendId);
  }

  @Get(':friend')
  getChatFromFriendship(
    @Param('racerId') racerId: string,
    @Param('racerFriendId') racerFriendId: string,
  ) {
    return this.chatGateway.onGetMessagesFromChat(racerId, racerFriendId)
  }
}
