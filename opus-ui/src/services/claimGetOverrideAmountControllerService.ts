import request from '@/utils/request';

export async function getOverrideAmount(params?: any, option?: any): Promise<any> {
  return request('/api/claim/th/getOverrideAmount', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getOverrideAmount,
};
