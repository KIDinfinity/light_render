import request from '@/utils/request';

export async function complete(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/v2/task/complete', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function endCaseForThai(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/v2/task/endCaseForThai', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function manualEscalateAssignee(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/v2/task/manualEscalateAssignee', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  complete,
  endCaseForThai,
  manualEscalateAssignee,
};
