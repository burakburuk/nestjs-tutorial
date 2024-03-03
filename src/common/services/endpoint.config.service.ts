import { Injectable } from '@nestjs/common';
import { AppConfigService } from './app.config.service';

@Injectable()
export class EndpointConfigService {
  constructor(private appConfigService: AppConfigService) {}

  get authenticationEndpoint() {
    return `${this.appConfigService.authApi}/api/auth`;
  }
}
