import request from '@/utils/request';

export async function getLabelByBusinessNo(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/label/getLabelByBusinessNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}
export async function addCaseLabel(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/caseLabel/addCaseLabel', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getLabelByBusinessNo,
  addCaseLabel,
};
