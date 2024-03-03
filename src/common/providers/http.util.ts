import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { AxiosHeaders, AxiosResponse } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AuthProviderService } from '../../auth/auth-provider.service';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class HttpUtil {
  private readonly logger = new Logger(HttpUtil.name);

  constructor(
    private readonly authProviderService: AuthProviderService,
    private readonly httpService: HttpService,
  ) {}

  private errorHandlerRequest = (
    error: any,
    endpoint: string,
    requestBody?: object | string,
  ) => {
    const errorDetails = {
      message: 'An error happened while making request to external api!',
      details: error.message ?? '',
      status: error.statusCode ?? error.status,
      endpoint,
      requestBody,
    };
    throw new HttpException(errorDetails, HttpStatus.BAD_GATEWAY);
  };

  async get<T = any>(
    url: string,
    headers?: AxiosHeaders,
  ): Promise<AxiosResponse<T, any>> {
    return firstValueFrom(
      this.httpService
        .get(url, {
          headers: headers as any,
        })
        .pipe(catchError((error) => this.errorHandlerRequest(error, url))),
    );
  }

  async post<T = any>(
    url: string,
    requestData: object | string,
    headers?: AxiosHeaders,
  ): Promise<AxiosResponse<T, any>> {
    return firstValueFrom(
      this.httpService
        .post(url, requestData, {
          headers,
        })
        .pipe(
          catchError((error) =>
            this.errorHandlerRequest(error, url, requestData),
          ),
        ),
    );
  }

  async getWtihAuth<T = any>(url: string): Promise<AxiosResponse<T, any>> {
    return firstValueFrom(
      this.httpService
        .get(url, {
          headers: this.authProviderService.getAuthHeader(),
        })
        .pipe(catchError((error) => this.errorHandlerRequest(error, url))),
    );
  }

  async postWithAuth<T = any>(
    url: string,
    requestData: object,
  ): Promise<AxiosResponse<T, any>> {
    return firstValueFrom(
      this.httpService
        .post(url, requestData, {
          headers: this.authProviderService.getAuthHeader(),
        })
        .pipe(
          catchError((error) =>
            this.errorHandlerRequest(error, url, requestData),
          ),
        ),
    );
  }
}
