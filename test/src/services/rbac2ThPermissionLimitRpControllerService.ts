
import request from '@/utils/request';

export async function submitAuthorityForBenefit(params?: any, option?: any): Promise<any> {
  return request('/rpc/rbac2/permission/submitAuthorityForBenefit', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function verifySubmitLimitType(params?: any, option?: any): Promise<any> {
  return request('/rpc/rbac2/permission/verifySubmitLimitType', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  submitAuthorityForBenefit,
  verifySubmitLimitType,
}
