
import request from '@/utils/request';

export async function getDocuments(params?: any, option?: any): Promise<any> {
  return request('/rpc/rule/claim/jpcr/getDocuments', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getDocuments,
}
