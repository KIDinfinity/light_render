
import request from '@/utils/request';

export async function getDispatchAddressByPolicyNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/integration/360/getDispatchAddressByPolicyNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getPayInStatusByPolicyNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/integration/360/getPayInStatusByPolicyNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getPolicyInfoFromLAByPolicyNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/integration/360/getPolicyInfoFromLAByPolicyNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getDispatchAddressByPolicyNo,
  getPayInStatusByPolicyNo,
  getPolicyInfoFromLAByPolicyNo,
}
