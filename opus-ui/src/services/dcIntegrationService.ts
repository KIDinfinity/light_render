import request from '@/utils/request';

export async function exceptionError(params?: any, option?: any): Promise<any> {
  return request('/api/dc/integration/exceptionError', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  exceptionError,
};
