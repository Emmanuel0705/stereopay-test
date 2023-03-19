import { HttpStatus } from '@nestjs/common';

export interface IRes<T> {
  data?: T;
  status: 'success' | 'error';
  message: string;
  page?: number;
  total?: number;
  statusCode?: number;
}
export function resPayload<T>(dt: {
  message: string;
  data?: T;
  stutusCode?: number;
  status?: 'success' | 'error';
  total?: number;
  page?: number;
}): IRes<T> {
  return {
    data: dt.data ?? null,
    status: dt.status || 'success',
    statusCode: dt.stutusCode || HttpStatus.OK,
    message: dt.message,
    total: dt.total || undefined,
  };
}

export type queryType = {
  page: number;
  perpage: number;
};

export const MESSAGES = {
  deleted: 'Media has been deleted',
  created: 'Successfully created',
  updated: 'Media Updated Successfully',
  found: 'Success',
};
