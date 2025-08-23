
import request from '@/utils/request';

export async function getInsured(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/encryption/getInsured', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function saveInsured(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/encryption/saveInsured', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function syncSnapshotToClaim(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/snapshot/syncSnapshotToClaim', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getInsured,
  saveInsured,
  syncSnapshotToClaim,
}
