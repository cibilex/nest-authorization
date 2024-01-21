import { UserT } from './user.type';

declare module 'fastify' {
  export interface FastifyRequest {
    user: UserT;
  }
}
