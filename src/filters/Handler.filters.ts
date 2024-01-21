import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';

@Catch(HttpException)
export class HandlerFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const data = exception.getResponse();
    const message =
      typeof data === 'string'
        ? data
        : ('message' in data && data.message) || 'Something went wrong';
    const response = host.switchToHttp().getResponse<FastifyReply>();

    response.status(exception.getStatus()).send({
      message,
      resTime: response.getResponseTime(),
      success: false,
    });
  }
}
