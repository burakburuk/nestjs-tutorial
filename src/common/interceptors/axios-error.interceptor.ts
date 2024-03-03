import {
  BadRequestException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AxiosError } from 'axios';

export const interceptAxiosError = (error: AxiosError) => {
  const endpoint = error.response?.config?.url;

  const extendedError = {
    message: error.message,
    endpoint,
  };

  const data = error.response?.data as object;
  const errorDetails = data ? { ...extendedError, ...data } : extendedError;

  const statusCode: number =
    error.response?.status ?? (error.response as any)?.statusCode ?? 0;

  switch (statusCode) {
    case HttpStatus.UNAUTHORIZED:
      throw new UnauthorizedException(errorDetails);
    case HttpStatus.FORBIDDEN:
      return false;
    case HttpStatus.NOT_FOUND:
      throw new NotFoundException(errorDetails);
    case HttpStatus.INTERNAL_SERVER_ERROR:
      throw new InternalServerErrorException(errorDetails);
    default:
      throw new BadRequestException(errorDetails);
  }
};
