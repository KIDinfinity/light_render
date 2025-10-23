
import { stringify } from 'qs';
import request from '@/utils/request';

export async function findBusinessDataByCaseNo(params?: any, option?: any): Promise<any> {
  return request(`/rpc/bpm/pos/bizProcess/findBusinessDataByCaseNo?${stringify(params)}`, {
    ...option,
  });
}

export async function completeTask(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/pos/task/completeTask', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  findBusinessDataByCaseNo,
  completeTask,
}
