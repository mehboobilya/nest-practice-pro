import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { DatabaseModule } from 'src/database/database.module';
import { ProducsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [DatabaseModule,
    MulterModule.register({
      dest: './upload',
    })
  ],
  controllers: [ProducsController],
  providers: [ProductsService],
})
export class ProductModule {}
