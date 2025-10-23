
import request from '@/utils/request';

export async function findAddTaskId(params?: any, option?: any): Promise<any> {
  return request('/api/cc/task/findAddTaskId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function isExistRejectTask(params?: any, option?: any): Promise<any> {
  return request('/api/cc/task/isExistRejectTask', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  findAddTaskId,
  isExistRejectTask,
}
