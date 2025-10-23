import request from '@/utils/request';

export async function getTask(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/task/getTask', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getNotices(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/task/getNotices', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getTask,
  getNotices,
};
