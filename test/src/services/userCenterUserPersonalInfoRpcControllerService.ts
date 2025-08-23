
import request from '@/utils/request';

export async function findByUserId(params?: any, option?: any): Promise<any> {
  return request('/rpc/uc/personal/findByUserId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findUserMailAddresses(params?: any, option?: any): Promise<any> {
  return request('/rpc/uc/personal/findUserMailAddresses', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  findByUserId,
  findUserMailAddresses,
}
