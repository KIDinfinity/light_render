
import request from '@/utils/request';

export async function reload(params?: any, option?: any): Promise<any> {
  return request('/api/planData/reload', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function reloadV2(params?: any, option?: any): Promise<any> {
  return request('/api/planData/reloadV2', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  reload,
  reloadV2,
}
