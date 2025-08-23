
import { stringify } from 'qs';
import request from '@/utils/request';

export async function policy(params?: any, option?: any): Promise<any> {
  return request(`/api/claim/patch/th/policy?${stringify(params)}`, {
    ...option,
  });
}

export default {
  policy,
}
