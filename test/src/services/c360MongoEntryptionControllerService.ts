
import { stringify } from 'qs';
import request from '@/utils/request';

export async function cleanCache(params?: any, option?: any): Promise<any> {
  return request(`/api/c360/entryption/cleanCache?${stringify(params)}`, {
    ...option,
  });
}

export default {
  cleanCache,
}
