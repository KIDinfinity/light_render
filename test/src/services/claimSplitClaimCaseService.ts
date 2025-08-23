import request from '@/utils/request';

export async function phSplit(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/phSplit', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function previewSplitCase(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/previewSplitCase', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function split(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/split', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function splitCaseAssessment(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/splitCaseAssessment', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function splitV2(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/splitV2', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function splitCaseV2(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/cases/splitCaseV2', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  phSplit,
  previewSplitCase,
  split,
  splitCaseAssessment,
  splitV2,
  splitCaseV2,
};
