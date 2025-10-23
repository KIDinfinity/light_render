
import request from '@/utils/request';

export async function findClientByRoles(params?: any, option?: any): Promise<any> {
  return request('/rpc/nb/uwclientinfo/findClientByRoles', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  findClientByRoles,
}
