
import request from '@/utils/request';

export async function amlCountryCleanAndInsert(params?: any, option?: any): Promise<any> {
  return request('/rpc/misc/amlCountryCleanAndInsert', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  amlCountryCleanAndInsert,
}
