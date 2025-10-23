
import request from '@/utils/request';

export async function findDocs(params?: any, option?: any): Promise<any> {
  return request('/api/doc/findDocs', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function manualMarkDocArrived(params?: any, option?: any): Promise<any> {
  return request('/api/doc/manualMarkDocArrived', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function saveDocInfo(params?: any, option?: any): Promise<any> {
  return request('/api/doc/saveDocInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submitDocs(params?: any, option?: any): Promise<any> {
  return request('/api/doc/submitDocs', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  findDocs,
  manualMarkDocArrived,
  saveDocInfo,
  submitDocs,
}
