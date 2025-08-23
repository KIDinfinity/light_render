
import request from '@/utils/request';

export async function listReasonDetailByClaimNos(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/envoy/listReasonDetailByClaimNos', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listReasonGroupActivity(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/envoy/listReasonGroupActivity', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  listReasonDetailByClaimNos,
  listReasonGroupActivity,
}
