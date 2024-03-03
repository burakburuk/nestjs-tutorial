import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { IncomingMessage } from 'http';
import { Reflector } from '@nestjs/core';
import { AuthService } from './auth.service';
import { AuthProviderService } from './auth-provider.service';
import { IS_PUBLIC_KEY } from './skip-auth';
import { AuthenticationHeader } from './models/authentication.model';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(
    private readonly authService: AuthService,
    private readonly authProvider: AuthProviderService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<IncomingMessage>();

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    if (!request.headers.authorization || !request.headers['user-agent']) {
      throw new UnauthorizedException(
        'Missing authorization or user-agent header!',
      );
    }

    const httpHeaders: AuthenticationHeader = {
      Authorization: request.headers.authorization,
      ['user-agent']: request.headers['user-agent'],
    };

    await this.authService.validateUserToken(httpHeaders);
    this.authProvider.setHeader(httpHeaders);

    return true;
  }
}
