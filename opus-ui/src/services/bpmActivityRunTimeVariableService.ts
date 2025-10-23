
import request from '@/utils/request';

export async function findUserIdByTaskId(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/actruvariable/findUserIdByTaskId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  findUserIdByTaskId,
}
