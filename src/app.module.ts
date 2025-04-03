import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { MessagingModule } from './messaging/messaging.module';

@Module({
  imports: [MessagingModule.register(), ProductsModule, OrdersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
