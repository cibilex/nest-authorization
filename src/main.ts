import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { HandlerFilter } from './filters/Handler.filters';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({}),
  );
  app.useGlobalFilters(new HandlerFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      enableDebugMessages: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(8000, '0.0.0.0');
}

bootstrap();
