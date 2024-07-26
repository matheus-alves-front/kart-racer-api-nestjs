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

  private messages: Prisma.SocialFriendshipCreateInput[] = [];

  onModuleInit() {
    this.server.on('connection', async (socket) => {
      this.server.emit('allMessages', this.messages)
      const namespace = socket.nsp
      console.log(namespace)
    })
  }

  @SubscribeMessage('sendMessage')
  async onTableUpdate(
    @MessageBody() body: Prisma.SocialFriendshipCreateInput,
    senderId: string,
    receiverId: string 
  ) {
    this.server.emit('messageListener', body, senderId, receiverId)
    // this.messages.push(body)
    // this.server.emit('allMessages', this.messages)
  }
}