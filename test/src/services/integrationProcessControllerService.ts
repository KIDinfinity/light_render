import request from '@/utils/request';

export async function getErrorIntegrationProcess(params?: any, option?: any): Promise<any> {
  return request('/api/integration/process/getErrorIntegrationProcess', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getAsyncSubmissionRequestData(params?: any, option?: any): Promise<any> {
  return request('/api/integration/process/getAsyncSubmissionRequestData', {
    ...option,
    method: 'POST',
    body: params,
  });
}
export default {
  getErrorIntegrationProcess,
  getAsyncSubmissionRequestData,
};
