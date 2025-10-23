
import { stringify } from 'qs';
import request from '@/utils/request';

export async function checkRegionIsJapan(params?: any, option?: any): Promise<any> {
  return request(`/api/bpm/jp/region/checkRegionIsJapan?${stringify(params)}`, {
    ...option,
  });
}

export default {
  checkRegionIsJapan,
}
