import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { MessagingService } from 'src/messaging/messaging.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly client: MessagingService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('token not found');
    }
    try {
      const data: { user: any; token: string } = await this.client.send(
        'auth.verify.user',
        token,
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { user, token: newToken } = data;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      request['user'] = user;
      request['token'] = newToken;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
