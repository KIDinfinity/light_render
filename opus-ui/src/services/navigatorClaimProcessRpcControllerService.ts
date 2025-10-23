
import request from '@/utils/request';

export async function getClaimProcess(params?: any, option?: any): Promise<any> {
  return request('/rpc/navigator/claim/getClaimProcess', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getClaimProcessList(params?: any, option?: any): Promise<any> {
  return request('/rpc/navigator/claim/getClaimProcessList', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getClaimProcess,
  getClaimProcessList,
}
