
import request from '@/utils/request';

export async function sendMqCall360(params?: any, option?: any): Promise<any> {
  return request('/api/claim/i360/insured/sendMqCall360', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function sendMqCall360Batch(params?: any, option?: any): Promise<any> {
  return request('/api/claim/i360/insured/sendMqCall360Batch', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function update(params?: any, option?: any): Promise<any> {
  return request('/api/claim/i360/insured/update', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function updateByInsuredId(params?: any, option?: any): Promise<any> {
  return request('/api/claim/i360/insured/updateByInsuredId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  sendMqCall360,
  sendMqCall360Batch,
  update,
  updateByInsuredId,
}
