
import request from '@/utils/request';

export async function getDocumentListForWool(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/document/getDocumentListForWool', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getDocumentListForWool,
}
