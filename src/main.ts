import { NestFactory } from '@nestjs/core';
import { LogLevel, RequestMethod } from '@nestjs/common';
import { AppModule } from './app/app.module';
import { AppConfigService } from './common/services/app.config.service';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { HttpService } from '@nestjs/axios';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { interceptAxiosError } from './common/interceptors/axios-error.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api', {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });
  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('NestJs Tutorial')
    .setDescription('NestJs Tutorial REST APIs')
    .setVersion('1.0')
    .addTag('tasks')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const httpService = new HttpService();
  httpService.axiosRef.interceptors.response.use(
    (response) => response,
    interceptAxiosError,
  );

  const configService = app.get(AppConfigService);

  const logLevels: LogLevel[] = ['error', 'warn'];
  if (configService.debugLogsEnabled) {
    logLevels.push('debug', 'log', 'verbose');
  }
  app.useLogger(logLevels);

  await app.listen(configService.port);
}
bootstrap();
