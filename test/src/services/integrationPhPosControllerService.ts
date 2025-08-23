
import request from '@/utils/request';

export async function changeAddressContact(params?: any, option?: any): Promise<any> {
  return request('/rpc/integration/ph/pos/changeAddressContact', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function policyReprint(params?: any, option?: any): Promise<any> {
  return request('/rpc/integration/ph/pos/policyReprint', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function refund(params?: any, option?: any): Promise<any> {
  return request('/rpc/integration/ph/pos/refund', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  changeAddressContact,
  policyReprint,
  refund,
}
