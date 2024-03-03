import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get productionEnv(): boolean {
    return this.configService.get('NODE_ENV') === 'production';
  }

  get port(): number {
    return this.configService.get('PORT') ?? 8001;
  }

  get debugLogsEnabled(): boolean {
    const value = this.configService.get('ENABLE_DEBUG_LOGS') ?? 'false';
    return value === 'true' || value === true;
  }

  get authApi(): string {
    return this.configService.get('AUTH_SERVICE_API');
  }
}
