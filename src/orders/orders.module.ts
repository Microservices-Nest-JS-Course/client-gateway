import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { MessagingModule } from 'src/messaging/messaging.module';

@Module({
  imports: [MessagingModule.register()],
  controllers: [OrdersController],
  providers: [],
})
export class OrdersModule {}
