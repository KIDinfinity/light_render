
import request from '@/utils/request';

export async function getAliasProductCodeByPolicyIdAndClaimNoAndProductCode(params?: any, option?: any): Promise<any> {
  return request('/rpc/claim/alias/getAliasProductCodeByPolicyIdAndClaimNoAndProductCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getAliasProductCodeByProductCodeAndSourceSystem(params?: any, option?: any): Promise<any> {
  return request('/rpc/claim/alias/getAliasProductCodeByProductCodeAndSourceSystem', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getAliasProductCodeByPolicyIdAndClaimNoAndProductCode,
  getAliasProductCodeByProductCodeAndSourceSystem,
}
