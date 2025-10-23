
import request from '@/utils/request';

export async function groupByUnknownDoc(params?: any, option?: any): Promise<any> {
  return request('/rpc/rules/ud/groupByUnknownDoc', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  groupByUnknownDoc,
}
