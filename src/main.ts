import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // prefix api
  app.setGlobalPrefix('api');
  // enable global validation
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
  console.log(`Server running on Port :::->${3000}`);
}
bootstrap();
