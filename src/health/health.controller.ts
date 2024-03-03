import { Controller, Get } from '@nestjs/common';
import { HealthCheck } from '@nestjs/terminus';
import { SkipAuth } from '../auth/skip-auth';

@SkipAuth()
@Controller('health')
export class HealthController {
  @Get()
  @HealthCheck()
  check() {
    return {
      status: 'ok',
    };
  }
}
