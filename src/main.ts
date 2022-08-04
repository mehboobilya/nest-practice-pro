import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './producs/products.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })

    .build();
  const document = SwaggerModule.createDocument(app, config, {
    include: [ProductModule, AuthModule],
  });
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
  console.log('server is running on PORT 3000');
}
bootstrap();
