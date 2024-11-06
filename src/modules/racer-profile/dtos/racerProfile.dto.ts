import { Prisma } from '@prisma/client';

export class RacerProfileQueryParams {
  id?: string;
  name?: string;
  birthDate?: string;
  whatsapp?: string;
  cpf?: string;
}

export class RacerProfileQueryDto implements Prisma.RacerProfileFindFirstArgs {
}
