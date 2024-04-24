import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AuthLoginService } from './authLogin.service';

@Global()
@Module({
  providers: [
    PrismaService,
    AuthLoginService
  ],
  exports: [
    PrismaService,
    AuthLoginService
  ]
})
export class PrismaModule {}