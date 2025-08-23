import request from '@/utils/request';

export async function beAssignedPermission(params) {
  return request('/api/cc/jp/test/beAssignedPermission', {
    method: 'POST',
    body: params,
  });
}

export async function syncCompleteTask(params) {
  return request('/api/cc/jp/test/syncCompleteTask', {
    method: 'POST',
    body: params,
  });
}

export default {
  beAssignedPermission,
  syncCompleteTask,
};
