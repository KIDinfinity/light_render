import request from '@/utils/request';

export async function addCaseLabel(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/caseLabel/addCaseLabel', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function deleteCaseLabel(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/caseLabel/deleteCaseLabel', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  addCaseLabel,
  deleteCaseLabel,
};
