import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);

  // set global prefix for all routes
  app.setGlobalPrefix('api');
  // enable cors for all routes
  app.enableCors();
  // enable node.js middle helmet library for all routes for security
  app.use(helmet());

  
  await app.listen(process.env.PORT ?? 4000)
}
bootstrap();
