
import request from '@/utils/request';

export async function getUnclosedByCaseNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/process/getUnclosedByCaseNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findLatesTaskByCaseNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/task/findLatesTaskByCaseNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getLatestAssigneeByCaseNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/task/getLatestAssigneeByCaseNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getUnclosedByCaseNo,
  findLatesTaskByCaseNo,
  getLatestAssigneeByCaseNo,
}
