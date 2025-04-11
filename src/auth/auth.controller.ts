import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { MessagingService } from 'src/messaging/messaging.service';
import { LoginUserDto, RegisterUserDto } from './dto';
import { AuthGuard } from './guards/auth.guard';
import { Token, User } from './decorators';
import { CurrentUser } from './interfaces/current-user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly client: MessagingService) {}

  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.client.send('auth.register.user', registerUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.client.send('auth.login.user', loginUserDto);
  }

  // Verificar si viene el token
  @UseGuards(AuthGuard)
  @Get('verify')
  verify(@User() user: CurrentUser, @Token() token: string) {
    // console.log({ user, token });
    // return this.client.send('auth.verify.user', {});
    return {
      user,
      token,
    };
  }
}
