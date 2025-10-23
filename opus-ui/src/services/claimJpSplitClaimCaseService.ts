
import request from '@/utils/request';

export async function splitCase(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/jp/splitCase', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function splitCaseV3(params?: any, option?: any): Promise<any> {
  return request('/api/claim/v3/jp/case/split', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  splitCase,
  splitCaseV3
}
