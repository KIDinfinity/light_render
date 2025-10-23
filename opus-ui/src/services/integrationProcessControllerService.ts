import request from '@/utils/request';

export async function getErrorIntegrationProcess(params?: any, option?: any): Promise<any> {
  return request('/api/integration/process/getErrorIntegrationProcess', {
    ...option,
    method: 'POST',
    body: params,
  });
}
export default {
  getErrorIntegrationProcess,
};
