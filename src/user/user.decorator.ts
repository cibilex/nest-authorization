import { FastifyRequest } from 'fastify';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserT } from 'src/types/user.type';

export const User = createParamDecorator(
  (data: keyof UserT, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<FastifyRequest>();
    return data ? request.user?.[data] : request.user;
  },
);
