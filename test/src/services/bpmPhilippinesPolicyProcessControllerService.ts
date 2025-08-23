
import request from '@/utils/request';

export async function assignTask(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/ph/pos/process/assignTask', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function completeTask(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/ph/pos/process/completeTask', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function startProcessInstance(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/ph/pos/process/startProcessInstance', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function startProcessInstanceSync(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/ph/pos/process/startProcessInstanceSync', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  assignTask,
  completeTask,
  startProcessInstance,
  startProcessInstanceSync,
}
