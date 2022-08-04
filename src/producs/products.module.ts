import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ProducsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ProducsController],
  providers: [ProductsService],
})
export class ProductModule {}
