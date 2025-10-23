
import request from '@/utils/request';

export async function findAllOrg(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/organization/findAllOrg', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  findAllOrg,
}
