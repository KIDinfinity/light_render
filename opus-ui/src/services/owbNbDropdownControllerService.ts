import request from '@/utils/request';

export async function list(params?: any, option?: any): Promise<any> {
  return request('/api/nb/dropdown/list', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listDedupCheckCfg(params?: any, option?: any): Promise<any> {
  return request('/api/nb/dropdown/listDedupCheckCfg', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  list,
  listDedupCheckCfg,
};
