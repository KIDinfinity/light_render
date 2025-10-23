import request from '@/utils/request';

export async function getAllIntegrationCode(params?: any, option?: any): Promise<any> {
  return request('/api/integration/info/getAllIntegrationCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getAllIntegrationCode,
};
