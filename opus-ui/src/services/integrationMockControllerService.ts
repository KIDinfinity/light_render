
import request from '@/utils/request';

export async function openIntegrationMock(params?: any, option?: any): Promise<any> {
  return request('/api/integration/v2/openIntegrationMock', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function setMockResponseData(params?: any, option?: any): Promise<any> {
  return request('/api/integration/v2/setMockResponseData', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  openIntegrationMock,
  setMockResponseData,
}
