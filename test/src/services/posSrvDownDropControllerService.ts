
import { stringify } from 'qs';
import request from '@/utils/request';

export async function listTransactionSubType(params?: any, option?: any): Promise<any> {
  return request(`/api/srv/dropdown/listTransactionSubType?${stringify(params)}`, {
    ...option,
  });
}

export async function listTransactionTypesByCaseCategory(params?: any, option?: any): Promise<any> {
  return request(`/api/srv/dropdown/listTransactionTypesByCaseCategory?${stringify(params)}`, {
    ...option,
  });
}

export default {
  listTransactionSubType,
  listTransactionTypesByCaseCategory,
}
