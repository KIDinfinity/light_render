
import request from '@/utils/request';

export async function findUserListByOwner(params?: any, option?: any): Promise<any> {
  return request('/api/uc/userRelation/findUserListByOwner', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  findUserListByOwner,
}
