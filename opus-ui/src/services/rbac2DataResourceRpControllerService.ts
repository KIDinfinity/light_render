
import request from '@/utils/request';

export async function findDataResource(params?: any, option?: any): Promise<any> {
  return request('/rpc/rbac2/resource/findDataResource', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  findDataResource,
}
