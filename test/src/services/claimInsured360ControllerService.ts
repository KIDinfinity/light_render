
import request from '@/utils/request';

export async function getInsuredId(params?: any, option?: any): Promise<any> {
  return request('/api/claim/360/getInsuredId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function insured(params?: any, option?: any): Promise<any> {
  return request('/api/claim/360/insured', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getInsuredId,
  insured,
}
