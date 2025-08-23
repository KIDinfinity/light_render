
import request from '@/utils/request';

export async function getByPolicyIdV2(params?: any, option?: any): Promise<any> {
  return request('/rpc/c360/pos/getByPolicyIdV2', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getDespatchByPolicyId(params?: any, option?: any): Promise<any> {
  return request('/rpc/c360/pos/getDespatchByPolicyId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getPayInStatusByPolicyId(params?: any, option?: any): Promise<any> {
  return request('/rpc/c360/pos/getPayInStatusByPolicyId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getByPolicyIdV2,
  getDespatchByPolicyId,
  getPayInStatusByPolicyId,
}
