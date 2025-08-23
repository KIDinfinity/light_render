
import request from '@/utils/request';

export async function bank(params?: any, option?: any): Promise<any> {
  return request('/api/misc/dropdown/bank', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function searchByCodes(params?: any, option?: any): Promise<any> {
  return request('/api/misc/dropdown/bank/searchByCodes', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function searchName(params?: any, option?: any): Promise<any> {
  return request('/api/misc/dropdown/bank/searchName', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  bank,
  searchByCodes,
  searchName,
}
