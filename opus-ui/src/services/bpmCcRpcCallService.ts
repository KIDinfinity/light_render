
import request from '@/utils/request';

export async function completeTask(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/cc/completeTask', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findAllPendingTask(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/cc/findAllPendingTask', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function startAndComplete(params?: any, option?: any): Promise<any> {
  return request('/rpc/bpm/cc/startAndComplete', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  completeTask,
  findAllPendingTask,
  startAndComplete,
}
