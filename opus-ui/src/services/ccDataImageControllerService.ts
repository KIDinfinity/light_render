
import request from '@/utils/request';

export async function listLatestHistoryByPage(params?: any, option?: any): Promise<any> {
  return request('/api/cc/data/image/listLatestHistoryByPage', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listPage(params?: any, option?: any): Promise<any> {
  return request('/api/cc/data/image/listPage', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  listLatestHistoryByPage,
  listPage,
}
