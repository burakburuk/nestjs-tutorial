import { Injectable } from '@nestjs/common';
import { AxiosHeaders, AxiosResponse } from 'axios';

import { AuthenticationHeader } from './models/authentication.model';
import { EndpointConfigService } from '../common/services/endpoint.config.service';
import { HttpUtil } from '../common/providers/http.util';

@Injectable()
export class AuthService {
  constructor(
    private readonly endpointConfigService: EndpointConfigService,
    private readonly httpUtil: HttpUtil,
  ) {}

  async validateUserToken(
    headers: AuthenticationHeader,
  ): Promise<AxiosResponse<any, any>> {
    return this.httpUtil.get(
      this.endpointConfigService.authenticationEndpoint,
      headers as unknown as AxiosHeaders,
    );
  }
}
