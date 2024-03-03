import { Injectable, Scope, UnauthorizedException } from '@nestjs/common';

import { AuthenticationHeader } from './models/authentication.model';

@Injectable({ scope: Scope.REQUEST })
export class AuthProviderService {
  private authHeader: AuthenticationHeader | null;

  setHeader(headers: AuthenticationHeader) {
    this.authHeader = headers;
  }

  getAuthHeader(): AuthenticationHeader {
    if (this.authHeader == null) {
      throw new UnauthorizedException();
    }
    return this.authHeader;
  }
}
