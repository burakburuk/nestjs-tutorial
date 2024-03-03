import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthProviderService } from './auth-provider.service';
import { Reflector } from '@nestjs/core';
import { HttpModule } from '@nestjs/axios';
import { AppConfigService } from '../common/services/app.config.service';
import { EndpointConfigService } from '../common/services/endpoint.config.service';
import { HttpUtil } from '../common/providers/http.util';

@Module({
  imports: [HttpModule],
  providers: [
    AuthService,
    AuthProviderService,
    Reflector,
    EndpointConfigService,
    AppConfigService,
    HttpUtil,
  ],
  exports: [AuthService, AuthProviderService],
})
export class AuthModule {}
