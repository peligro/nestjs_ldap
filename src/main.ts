import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //validaciones para DTO
  app.useGlobalPipes(new ValidationPipe());
  //cors
  app.enableCors(); 
  //prefijo API
  app.setGlobalPrefix(process.env.PREFIJO+"");
  //despliegue y puerto
  await app.listen(""+process.env.PORT );
}
bootstrap();
