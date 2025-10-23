
import request from '@/utils/request';

export async function cleanAllBusinessData(params?: any, option?: any): Promise<any> {
  return request('/api/c360/clean/cleanAllBusinessData', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  cleanAllBusinessData,
}
