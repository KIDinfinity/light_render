
import request from '@/utils/request';

export async function queryByTypeCodeFullSetOnly(params?: any, option?: any): Promise<any> {
  return request('/rpc/misc/dictionary/queryByTypeCodeFullSetOnly', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  queryByTypeCodeFullSetOnly,
}
