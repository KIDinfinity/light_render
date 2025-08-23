
import request from '@/utils/request';

export async function startSchedule(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/dbr/start/startSchedule', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function stopSchedule(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/dbr/stop/stopSchedule', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  startSchedule,
  stopSchedule,
}
