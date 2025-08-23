
import request from '@/utils/request';

export async function beAssignedPermission(params?: any, option?: any): Promise<any> {
  return request('/api/cc/jp/test/beAssignedPermission', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function syncCompleteTask(params?: any, option?: any): Promise<any> {
  return request('/api/cc/jp/test/syncCompleteTask', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  beAssignedPermission,
  syncCompleteTask,
}
