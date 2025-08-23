
import request from '@/utils/request';

export async function approveSubmission(params?: any, option?: any): Promise<any> {
  return request('/api/cc/bpm/approveSubmission', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findAllPendingBatch(params?: any, option?: any): Promise<any> {
  return request('/api/cc/bpm/findAllPendingBatch', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function rejectSubmission(params?: any, option?: any): Promise<any> {
  return request('/api/cc/bpm/rejectSubmission', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submit(params?: any, option?: any): Promise<any> {
  return request('/api/cc/bpm/submit', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  approveSubmission,
  findAllPendingBatch,
  rejectSubmission,
  submit,
}
