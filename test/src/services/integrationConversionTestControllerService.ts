
import request from '@/utils/request';

export async function generateConversionConfig(params?: any, option?: any): Promise<any> {
  return request('/api/integration/v2/conversion/generateConversionConfig', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function testRequest(params?: any, option?: any): Promise<any> {
  return request('/api/integration/v2/conversion/testRequest', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function testResponse(params?: any, option?: any): Promise<any> {
  return request('/api/integration/v2/conversion/testResponse', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  generateConversionConfig,
  testRequest,
  testResponse,
}
