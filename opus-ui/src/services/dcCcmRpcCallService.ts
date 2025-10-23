
import request from '@/utils/request';

export async function getMainData(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/ccm/jp/getMainData', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getMainData,
}
