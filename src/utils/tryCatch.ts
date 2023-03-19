import { HttpStatus } from '@nestjs/common';
import { IRes, resPayload } from './helpers';

export default async function tryCatch<T>(
  promise: Promise<T>,
  message?: string,
): Promise<IRes<T>> {
  try {
    const result = await promise;
    return resPayload({ message: message || 'success', data: result });
  } catch (e: any) {
    return resPayload({
      status: 'error',
      message: e.message,
      stutusCode: e.status || HttpStatus.BAD_REQUEST,
    });
  }
}

export async function QueryBuilder<T>(
  promise: Promise<T>,
  message?: string,
): Promise<IRes<T>> {
  try {
    const result = await promise;
    return resPayload({
      message: message || 'success',
      data: result[0],
      total: result[1],
    });
  } catch (e: any) {
    return resPayload({
      status: 'error',
      message: e.message,
      stutusCode: e.status || HttpStatus.BAD_REQUEST,
    });
  }
}
