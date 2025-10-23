
import { stringify } from 'qs';
import request from '@/utils/request';

export async function getVersion(params?: any, option?: any): Promise<any> {
  return request(`/rpc/rule/getVersion?${stringify(params)}`, {
    ...option,
  });
}

export default {
  getVersion,
}
