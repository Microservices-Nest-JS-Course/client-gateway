import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';
import { RpcError } from '../interfaces/rpc-error.interface';

@Catch(RpcException, HttpException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException | HttpException | Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = 500;
    let message = 'Internal Server Error';

    if (exception instanceof RpcException) {
      const error = exception.getError() as RpcError;
      if (
        typeof error === 'object' &&
        error !== null &&
        'status' in error &&
        'message' in error &&
        typeof error.status === 'number'
      ) {
        status = error.status;
        message = error.message;
      }
    } else if (exception instanceof HttpException) {
      const responseError = exception.getResponse();

      if (typeof responseError === 'object' && responseError !== null) {
        const err = responseError as { status?: number; message?: string };
        status =
          typeof err.status === 'number' ? err.status : exception.getStatus();
        message = err.message || message;
      } else {
        message = String(responseError);
        status = exception.getStatus();
      }
    } else {
      exception = new InternalServerErrorException();
    }

    // Aseguramos que el status sea un número válido
    if (typeof status !== 'number' || isNaN(status)) {
      status = 500;
    }

    response.status(status).json({
      message,
      status, // Aseguramos que siempre sea `statusCode`
    });
  }
}
