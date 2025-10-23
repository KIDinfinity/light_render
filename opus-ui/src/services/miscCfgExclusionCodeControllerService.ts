
import request from '@/utils/request';

export async function getCfgExclusion(params?: any, option?: any): Promise<any> {
  return request('/api/misc/cfg/getCfgExclusion', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getCfgExclusion,
}
