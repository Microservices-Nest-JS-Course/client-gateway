import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { MessagingModule } from 'src/messaging/messaging.module';

@Module({
  imports: [MessagingModule.register()],
  controllers: [AuthController],
})
export class AuthModule {}
