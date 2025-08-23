import request from '@/utils/request';

export async function getPhLaLivingClaimPayableRegisterStatus(
  params?: any,
  option?: any
): Promise<any> {
  return request('/api/claim/register/getPhLaLivingClaimPayableRegisterStatus', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getPhLaLivingClaimPayableRegisterStatusByBusinessNo(
  params?: any,
  option?: any
): Promise<any> {
  return request('/api/claim/register/getPhLaLivingClaimPayableRegisterStatusByBusinessNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}
export async function registerClaimCase(params?: any, option?: any): Promise<any> {
  return request('/api/claim/register/registerClaimCase', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getPhLaLivingClaimPayableRegisterStatus,
  getPhLaLivingClaimPayableRegisterStatusByBusinessNo,
  registerClaimCase,
};
