import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class HealthCheckController {
  @Get()
  healthCheck() {
    return 'Client Gateway is up and running - V6.7.2!!';
  }
}
