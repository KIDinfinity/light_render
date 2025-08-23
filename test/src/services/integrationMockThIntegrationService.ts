
import request from '@/utils/request';

export async function mockOds(params?: any, option?: any): Promise<any> {
  return request('/rpc/th/mock/mock/mockOds', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function mockOdsOnAssessment(params?: any, option?: any): Promise<any> {
  return request('/rpc/th/mock/mock/mockOdsOnAssessment', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  mockOds,
  mockOdsOnAssessment,
}
