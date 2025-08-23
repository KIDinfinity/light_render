
import { stringify } from 'qs';
import request from '@/utils/request';

export async function getMcsClaimPaymentList(params?: any, option?: any): Promise<any> {
  return request(`/rpc/claim/jp/getMcsClaimPaymentList?${stringify(params)}`, {
    ...option,
  });
}

export default {
  getMcsClaimPaymentList,
}
