
import request from '@/utils/request';

export async function getPageFieldList(params?: any, option?: any): Promise<any> {
  return request('/api/doc/page/field/list/getPageFieldList', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getPageFieldList,
}
