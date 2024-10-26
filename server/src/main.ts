import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GENERAL_CONFIG } from './common/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(GENERAL_CONFIG.PORT);
}
bootstrap();
