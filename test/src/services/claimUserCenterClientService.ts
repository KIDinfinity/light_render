
import request from '@/utils/request';

export async function findByRoleCode(params?: any, option?: any): Promise<any> {
  return request('/rpc/uc/userGeneralInfo/findByRoleCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  findByRoleCode,
}
