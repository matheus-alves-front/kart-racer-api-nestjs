import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RacerSocialsService } from './racer-socials.service';

@Controller('racer/:racerId/racer-socials')
export class RacerSocialsController {
  constructor(private readonly racerSocialsService: RacerSocialsService) {}

  @Post('addFriend/:racerFriendId')
  addFriend(
    @Param('racerFriendId') racerFriendId: string,
    @Param('racerId') racerId: string,
  ) {
    return this.racerSocialsService.addRacerFriend(racerId, racerFriendId);
  }

  @Post('acceptFriend/:racerFriendId')
  acceptFriend(
    @Param('racerFriendId') racerFriendId: string,
    @Param('racerId') racerId: string,
  ) {
    return this.racerSocialsService.acceptRacerFriend(racerId, racerFriendId);
  }

  @Get('friends')
  getFriends(
    @Param('racerId') racerId: string,
  ) {
    return this.racerSocialsService.getAllFriends(racerId);
  }

  @Delete('deleteFriend/:racerFriendId')
  deleteFriend(
    @Param('racerFriendId') racerFriendId: string,
    @Param('racerId') racerId: string,
  ) {
    return this.racerSocialsService.deleteFriendship(racerId, racerFriendId);
  }

  @Get('friend-requests')
  getFriendRequests(
    @Param('racerId') racerId: string,
  ) {
    return this.racerSocialsService.getAllFriendRequests(racerId);
  }

  @Delete('deleteFriendRequest/:racerFriendId')
  deleteFriendRequest(
    @Param('racerFriendId') racerFriendId: string,
    @Param('racerId') racerId: string,
  ) {
    return this.racerSocialsService.deleteFriendship(racerId, racerFriendId);
  }
}
