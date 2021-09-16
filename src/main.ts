import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { CrudConfigService } from '@nestjsx/crud';
import { AppModule } from './app.module';
import { ResponseTransformInterceptor } from './common/interceptor/response-transform.interceptor';
import { serverConfig } from './config/base.config';
import * as bodyParser from 'body-parser';

CrudConfigService.load({
  auth: {
    property: 'user',
  },
});
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      // whitelist: true,
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('BASE NESTJS')
    .addBearerAuth()
    .setDescription('API FOR BASE NESTJS TNA')
    .setVersion('0.0.4')
    .build();
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'BASE NESTJS',
  };
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api', app, document, customOptions);

  app.useGlobalInterceptors(new ResponseTransformInterceptor());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.enableCors();
  await app.listen(serverConfig.port);
}
bootstrap();
