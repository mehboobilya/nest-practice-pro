import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './producs/products.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { S3StorageModule } from './s3Storage/s3Storage.module';

@Module({
  imports: [ProductModule, DatabaseModule, AuthModule, S3StorageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
