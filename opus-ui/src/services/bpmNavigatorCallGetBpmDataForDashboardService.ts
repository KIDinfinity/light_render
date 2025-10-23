
import request from '@/utils/request';

export async function query(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/dashboard/query', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function queryOperatorAndCostTime(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/dashboard/queryOperatorAndCostTime', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  query,
  queryOperatorAndCostTime,
}
