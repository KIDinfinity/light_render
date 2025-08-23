
import request from '@/utils/request';

export async function withdraw(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/jp/withdraw', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function v2(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/jp/withdraw/v2', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  withdraw,
  v2,
}
