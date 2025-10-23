
import request from '@/utils/request';

export async function findByRegion(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/cases/moduleConfig/findByRegion', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  findByRegion,
}
