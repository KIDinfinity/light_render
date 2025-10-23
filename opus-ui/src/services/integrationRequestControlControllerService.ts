
import request from '@/utils/request';

export async function asyncExternalRequest(params?: any, option?: any): Promise<any> {
  return request('/api/integration/request/control/asyncExternalRequest', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function asyncExternalRequests(params?: any, option?: any): Promise<any> {
  return request('/api/integration/request/control/asyncExternalRequests', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function mockSaveRequestControlJob(params?: any, option?: any): Promise<any> {
  return request('/api/integration/request/control/mockSaveRequestControlJob', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  asyncExternalRequest,
  asyncExternalRequests,
  mockSaveRequestControlJob,
}
