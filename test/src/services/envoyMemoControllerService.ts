import { stringify } from 'qs';
import request from '@/utils/request';

export async function listMemos(params?: any, option?: any): Promise<any> {
  return request(`/api/evy/memo/listMemos?${stringify(params)}`, {
    localCache: true,
    ...option,
  });
}

export async function listRequestClientInfo(params?: any, option?: any): Promise<any> {
  return request('/api/evy/memo/listRequestClientInfo', {
    localCache: {
      timeout: 30 * 1000
    },
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  listMemos,
  listRequestClientInfo,
}
