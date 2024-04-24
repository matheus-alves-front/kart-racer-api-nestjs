import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { IncomingHttpHeaders } from 'http';
import { Observable } from 'rxjs';
import { AuthLoginService } from 'src/modules/prisma/authLogin.service';

@Injectable()
export class GuardProfileTokens implements CanActivate {
  constructor(private readonly authService: AuthLoginService) {}

  private async validateToken(headers: IncomingHttpHeaders) {
    const { authorization } = headers

    if (!authorization) return false

    const validateToken = await this.authService.validateToken(authorization)

    if(!validateToken) return false

    return true
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const headers = request.headers as IncomingHttpHeaders

    return this.validateToken(headers);
  }
}