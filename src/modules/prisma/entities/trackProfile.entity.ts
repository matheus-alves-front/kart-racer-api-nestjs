import { AuthToken, Race, RacerProfile, TrackProfile, TrackRecords } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class TrackProfileEntity implements TrackProfile {
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
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  availabilityStart: string;

  @ApiProperty()
  availabilityEnd: string;

  @ApiProperty()
  raceIntervals: number;

  @ApiProperty()
  addressGoogleURL: string;
  
  @ApiProperty()
  website: string;
  
  @ApiProperty({isArray: true})
  trackModes: string[];
  
  @ApiProperty({isArray: true})
  racersProfileIds: string[];

  @ApiProperty({isArray: true})
  racersProfile: RacerProfile[];
  
  @ApiProperty()
  address: { street: string; city: string; state: string; zip: string; };

  @ApiProperty({isArray: true})
  raceIds: string[];

  @ApiProperty({isArray: true})
  races: Race[];

  @ApiProperty({isArray: true})
  trackRecords: TrackRecords[];

  @ApiProperty({isArray: true})
  authToken: AuthToken[];
}

