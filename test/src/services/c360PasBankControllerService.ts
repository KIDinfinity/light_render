
import request from '@/utils/request';

export async function getBankByCode(params?: any, option?: any): Promise<any> {
  return request('/api/c360/pas/getBankByCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getBankByCode,
}
