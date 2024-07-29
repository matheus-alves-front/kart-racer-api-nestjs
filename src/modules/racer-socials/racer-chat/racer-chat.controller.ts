import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { RacerChatGateway } from './racer-chat.gateway';
import { RacerChatService } from './racer-chat.service';
@Controller('racer/:racerId/racer-socials')
export class RacerChatController {
  constructor(
    private readonly chatGateway: RacerChatGateway,
    private readonly chatService: RacerChatService,
  ) {}

  @Post('chat/:friendShipId')
  sendMessageByFriendshipId(
    @Param('friendShipId') friendShipId: string,
    @Param('racerId') racerId: string,
    @Body() body: { message: string }
  ) {
    return this.chatGateway.onSendMessage(body, racerId, friendShipId);
  }

  @Get('chat/:friendShipId')
  getChatFromFriendship(
    @Param('friendShipId') friendShipId: string,
  ) {
    return this.chatService.getConnectChat(friendShipId)
  }

  @Get('chat/:friendShipId/more')
  loadMoreChat(
    @Param('friendShipId') friendShipId: string,
  ) {
    return this.chatService.loadMoreChat(friendShipId)
  }
}
