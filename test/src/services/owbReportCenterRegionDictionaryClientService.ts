
import { stringify } from 'qs';
import request from '@/utils/request';

export async function getRegionCodeBeforeLogin(params?: any, option?: any): Promise<any> {
  return request(`/api/misc/dictionary/getRegionCodeBeforeLogin?${stringify(params)}`, {
    ...option,
  });
}

export default {
  getRegionCodeBeforeLogin,
}
