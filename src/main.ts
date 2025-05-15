import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // set global prefix for all routes
  app.setGlobalPrefix('api');
  // enable cors for all routes
  app.enableCors();
  // enable node.js middle helmet library for all routes for security
  app.use(helmet());

  // enable global validation pipe for all routes
  app.useGlobalPipes(new ValidationPipe());



  // Swagger
  const config = new DocumentBuilder()
    .setTitle(`${process.env.APP_NAME} API`)
    .setDescription(`${process.env.APP_NAME} API DOCS`)
    .setVersion('1.0')
    .addTag(`${process.env.APP_NAME}`)
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory);


  await app.listen(process.env.PORT ?? 4000, '0.0.0.0')
}
bootstrap();
