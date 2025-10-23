
import request from '@/utils/request';

export async function completeTask(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/rabbit/send/completeTask', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function sendCaseMgntMq(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/rabbit/send/sendCaseMgntMq', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function sendRelevantCaseMq(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/rabbit/send/sendRelevantCaseMq', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function startProcess(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/rabbit/send/startProcess', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  completeTask,
  sendCaseMgntMq,
  sendRelevantCaseMq,
  startProcess,
}
