
import request from '@/utils/request';

export async function verifyAuthorityByResourceValues(params?: any, option?: any): Promise<any> {
  return request('/rpc/rbac2/resource/verifyAuthorityByResourceValues', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function verifyHkClaimApprovalSubmit(params?: any, option?: any): Promise<any> {
  return request('/rpc/rbac2/resource/verifyHkClaimApprovalSubmit', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function verifySubmitAuthority(params?: any, option?: any): Promise<any> {
  return request('/rpc/rbac2/resource/verifySubmitAuthority', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  verifyAuthorityByResourceValues,
  verifyHkClaimApprovalSubmit,
  verifySubmitAuthority,
}
