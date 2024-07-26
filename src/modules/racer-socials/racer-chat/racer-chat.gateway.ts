import { Injectable, OnModuleInit } from "@nestjs/common";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Prisma } from "@prisma/client";
import { Server } from 'socket.io'
import { RacerChatService } from "./racer-chat.service";

@WebSocketGateway({
  cors: {
    origin: '*'
  },
})

@Injectable()
export class RacerChatGateway implements OnModuleInit {
  constructor (
    private readonly chatService: RacerChatService
  ) {}

  @WebSocketServer()
  server: Server

  onModuleInit() {
    this.server.on('connection', async (socket) => {
    })
  }

  async onSendMessage(
    @MessageBody() body: { message: string },
    senderId: string,
    friendShipId: string
  ) {
    const sendMessage = await this.chatService.createSendMessage(senderId, friendShipId, body)
    this.server.emit(`chat/friendship/${friendShipId}`, sendMessage)
  }
}