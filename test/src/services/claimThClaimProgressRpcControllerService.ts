
import { stringify } from 'qs';
import request from '@/utils/request';

export async function getClaimPaymentList(params?: any, option?: any): Promise<any> {
  return request(`/rpc/claim/th/getClaimPaymentList?${stringify(params)}`, {
    ...option,
  });
}

export default {
  getClaimPaymentList,
}
