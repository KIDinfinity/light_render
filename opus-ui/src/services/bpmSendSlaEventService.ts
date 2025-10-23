
import request from '@/utils/request';

export async function assignActivity(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/sla/assignActivity', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function completeTask(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/sla/completeTask', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function createCaseEvent(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/sla/createCaseEvent', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function levelChangeEvent(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/sla/levelChangeEvent', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function rejectTask(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/sla/rejectTask', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function sendSLAEvent(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/sla/sendSLAEvent', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  assignActivity,
  completeTask,
  createCaseEvent,
  levelChangeEvent,
  rejectTask,
  sendSLAEvent,
}
