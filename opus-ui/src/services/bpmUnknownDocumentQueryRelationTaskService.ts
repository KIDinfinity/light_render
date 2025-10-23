
import request from '@/utils/request';

export async function listUDRelationTasks(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/task/listUDRelationTasks', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  listUDRelationTasks,
}
