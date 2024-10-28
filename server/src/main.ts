import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GENERAL_CONFIG } from './common/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const apiVersion = 'v1';
  const apiPrefix = `api/${apiVersion}`;
  app.setGlobalPrefix(apiPrefix);

  // Set up Swagger
  const config = new DocumentBuilder()
    .setTitle('Connector API')
    .setVersion(apiVersion)
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  const swaggerPath = `${apiPrefix}/docs`;
  SwaggerModule.setup(swaggerPath, app, documentFactory);

  // Enable validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      stopAtFirstError: true,
      // exceptionFactory: () => {}
    }),
  );

  await app.listen(GENERAL_CONFIG.PORT);

  // Logging
  const logger = new Logger('Bootstrap');
  logger.log(`Server is running on port ${GENERAL_CONFIG.PORT}`);
}
bootstrap();
