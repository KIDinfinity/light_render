
import request from '@/utils/request';

export async function findAllUsers(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/user/findAllUsers', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  findAllUsers,
}
