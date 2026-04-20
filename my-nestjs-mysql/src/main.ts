import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('antes de Cors');
  app.enableCors({
    origin: ['http://localhost:5173'],
    methods: 'GET , HEAD, POST , PUT , PATCH , DELETE',
    credentials: true,
    allowHeaders: 'Content-Type, Authorization',
  });
  console.log('luego de Cors');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
