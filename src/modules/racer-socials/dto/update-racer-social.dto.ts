import { PartialType } from '@nestjs/mapped-types';
import { CreateRacerSocialDto } from './create-racer-social.dto';

export class UpdateRacerSocialDto extends PartialType(CreateRacerSocialDto) {}
