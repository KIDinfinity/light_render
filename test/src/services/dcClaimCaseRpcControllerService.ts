
import request from '@/utils/request';

export async function queryByClaimNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/mongodb/queryByClaimNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function queryByPage(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/mongodb/queryByPage', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function queryClaimCaseByClaimNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/mongodb/queryClaimCaseByClaimNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function queryDistinctByPage(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/mongodb/queryDistinctByPage', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  queryByClaimNo,
  queryByPage,
  queryClaimCaseByClaimNo,
  queryDistinctByPage,
}
