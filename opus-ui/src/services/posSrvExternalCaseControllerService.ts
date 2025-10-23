import request from '@/utils/request';

export async function asyncRequestExternalCase(params?: any, option?: any): Promise<any> {
  return request('/api/srv/externalCase/asyncRequestExternalCase', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getAsyncRequestExternalCaseResult(params?: any, option?: any): Promise<any> {
  return request('/api/srv/externalCase/getAsyncRequestExternalCaseResult', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  asyncRequestExternalCase,
  getAsyncRequestExternalCaseResult,
};
