
import request from '@/utils/request';

export async function list(params?: any, option?: any): Promise<any> {
  return request('/api/mc/group/list', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listMember(params?: any, option?: any): Promise<any> {
  return request('/api/mc/group/listMember', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  list,
  listMember,
}
