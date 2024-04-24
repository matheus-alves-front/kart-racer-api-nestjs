import { AuthToken, Race, RacerProfile, RankingType, TrackProfile, TrackRecords } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class RacerProfileEntity implements RacerProfile {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ required: false, nullable: true })
  birthDate: string;

  @ApiProperty()
  cpf: string | null;

  @ApiProperty()
  whatsapp: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  ranking: RankingType;

  @ApiProperty({isArray: true})
  tracksUnlockedIds: string[];

  @ApiProperty({isArray: true})
  tracksUnlocked: TrackProfile[];

  @ApiProperty({isArray: true})
  raceIds: string[];

  @ApiProperty({isArray: true})
  races: Race[];

  @ApiProperty({isArray: true})
  hostedRaceIds: string[];

  @ApiProperty({isArray: true})
  hostedRaces: Race[];

  @ApiProperty({isArray: true})
  trackRecords: TrackRecords[];

  @ApiProperty({isArray: true})
  authToken: AuthToken[];
}

