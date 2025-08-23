
import { stringify } from 'qs';
import request from '@/utils/request';

export async function getThenSend(params?: any, option?: any): Promise<any> {
  return request(`/api/claim/insured/getThenSend?${stringify(params)}`, {
    ...option,
  });
}

export default {
  getThenSend,
}
