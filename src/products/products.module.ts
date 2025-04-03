import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { MessagingModule } from 'src/messaging/messaging.module';

@Module({
  imports: [MessagingModule.register()],
  controllers: [ProductsController],
})
export class ProductsModule {}
