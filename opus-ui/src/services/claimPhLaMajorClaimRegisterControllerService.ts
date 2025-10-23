
import request from '@/utils/request';

export async function getLaMajorClaimRegisterStatus(params?: any, option?: any): Promise<any> {
  return request('/api/claim/register/major/getLaMajorClaimRegisterStatus', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function register(params?: any, option?: any): Promise<any> {
  return request('/api/claim/register/major/register', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getLaMajorClaimRegisterStatus,
  register,
}
