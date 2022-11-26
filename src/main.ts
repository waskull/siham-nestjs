import { NestFactory } from '@nestjs/core';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
//import {createResource} from './config/default-user';
import {ConfigService} from '@nestjs/config'
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:4200'],
    credentials: true,
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS',
  });
  app.use(cookieParser());
  const logger = new Logger();
  const cS = app.get(ConfigService);
  // const resource = new createResource();
  // resource.createUser();
  const config = new DocumentBuilder()
    .setTitle('Documentation OpenAPI')
    .addCookieAuth()
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('SIHAM')
    .build();
    const port = 3000;
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true
  }));
  await app.listen(port);
  logger.log('Servidor corriendo en el puerto: '+port);
}




bootstrap();
