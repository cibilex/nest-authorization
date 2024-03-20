import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Auth } from './auth.decorator';
import { FastifyRequest } from 'fastify';
import { JwtService } from '@nestjs/jwt';
import { UserT } from 'src/types/user.type';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const auth = this.reflector.getAllAndOverride(Auth, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
    if (!auth) return true;
    const request = ctx.switchToHttp().getRequest<FastifyRequest>();
    const token = this.getBearerToken(request);
    const payload = await this.verify(token);
    request.user = payload;

    return true;
  }

  private async verify(token: string) {
    try {
      const payload = this.jwtService.verify(token) as UserT;
      return payload;
    } catch (error) {
      throw new ForbiddenException();
    }
  }

  private getBearerToken(req: FastifyRequest) {
    const [bearer, token] = req.headers.authorization?.split(' ') || [];
    if (bearer !== 'Bearer') throw new ForbiddenException();
    return token;
  }
}
