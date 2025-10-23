import request from '@/utils/request';

export function accountRegister(params?: any, option?: any): Promise<any> {
  return request('/api/claim/omne/accountRegister', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function claimInfoSync(params?: any, option?: any): Promise<any> {
  return request('/api/claim/omne/claimInfoSync', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default { accountRegister, claimInfoSync };
