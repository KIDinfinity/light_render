
import request from '@/utils/request';

export async function getConversionData(params?: any, option?: any): Promise<any> {
  return request('/rpc/integration/conversion/getConversionData', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getConversionData,
}
