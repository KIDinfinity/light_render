
import request from '@/utils/request';

export async function batchDel(params?: any, option?: any): Promise<any> {
  return request('/api/mc/bpm/message/batchDel', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function batchUpdStatus(params?: any, option?: any): Promise<any> {
  return request('/api/mc/bpm/message/batchUpdStatus', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function del(params?: any, option?: any): Promise<any> {
  return request('/api/mc/bpm/message/del', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function list(params?: any, option?: any): Promise<any> {
  return request('/api/mc/bpm/message/list', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function updStatus(params?: any, option?: any): Promise<any> {
  return request('/api/mc/bpm/message/updStatus', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  batchDel,
  batchUpdStatus,
  del,
  list,
  updStatus,
}
