
import request from '@/utils/request';

export async function findInfoListByCondition(params?: any, option?: any): Promise<any> {
  return request('/rpc/navigator/information/findInfoListByCondition', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function save(params?: any, option?: any): Promise<any> {
  return request('/rpc/navigator/information/save', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  findInfoListByCondition,
  save,
}
