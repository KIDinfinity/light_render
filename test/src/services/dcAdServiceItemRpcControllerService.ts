
import request from '@/utils/request';

export async function getADServiceItemForWool(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/claim/getADServiceItemForWool', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getADServiceItemForWool,
}
