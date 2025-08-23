
import request from '@/utils/request';

export async function queryByCaseCategoryAndOperationType(params?: any, option?: any): Promise<any> {
  return request('/rpc/misc/validate/queryByCaseCategoryAndOperationType', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  queryByCaseCategoryAndOperationType,
}
