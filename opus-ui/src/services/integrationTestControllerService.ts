import request from '@/utils/request';

export async function callService(params?: any, option?: any): Promise<any> {
  return request('/api/integration/v2/test/callService', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function convertResponse(params?: any, option?: any): Promise<any> {
  return request('/api/integration/v2/test/convertResponse', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function mappingResponsetest(params?: any, option?: any): Promise<any> {
  return request('/api/integration/v2/test/mappingResponsetest', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function testThrowException(params?: any, option?: any): Promise<any> {
  return request('/api/integration/v2/test/testThrowException', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function unknow(params?: any, option?: any): Promise<any> {
  return request('/api/integration/v2/test/xurasTest/{:screenCode}', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function integrationStart(params?: any, option?: any) {
  return request('/api/integration/v2/start', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  callService,
  convertResponse,
  mappingResponsetest,
  testThrowException,
  unknow,
  integrationStart,
};
