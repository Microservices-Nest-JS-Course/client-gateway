import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config';
import { RpcCustomExceptionFilter } from './common';

async function bootstrap() {
  const logger = new Logger('Main');
  try {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );
    app.useGlobalFilters(new RpcCustomExceptionFilter());
    await app.listen(envs.server.port ?? 3000);
    console.log('Hola mundo, segundo cambio');
    logger.log(
      `🚀 Gateway is running on: http://localhost:${envs.server.port}`,
    );
  } catch (error) {
    logger.error(`😱 Application is not running: ${error}`);
    process.exit(1);
  }
}

bootstrap();
