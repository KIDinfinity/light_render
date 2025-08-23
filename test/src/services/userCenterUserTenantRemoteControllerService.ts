
import { stringify } from 'qs';
import request from '@/utils/request';

export async function get(params?: any, option?: any): Promise<any> {
  return request(`/rpc/uc/tenant/get?${stringify(params)}`, {
    ...option,
  });
}

export default {
  get,
}
