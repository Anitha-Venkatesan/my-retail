import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  getSwaggerModule(app);
  const port = parseInt(process.env.SERVER_PORT);
  await app.listen(port);
}
function getSwaggerModule(app) {
  const config = new DocumentBuilder()
    .setTitle('myRetail')
    .setDescription('API for myRetail application')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

bootstrap();
