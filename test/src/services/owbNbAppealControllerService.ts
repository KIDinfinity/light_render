import request from '@/utils/request';

export async function create(params?: any, option?: any): Promise<any> {
  return request('/api/nb/appeal/create', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function testUpdateInquiryApplicationNo(params?: any, option?: any): Promise<any> {
  return request('/api/nb/appeal/proposal/testUpdateInquiryApplicationNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function validateExpirationDate(params?: any, option?: any): Promise<any> {
  return request('/api/nb/appeal/validateExpirationDate', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  create,
  testUpdateInquiryApplicationNo,
  validateExpirationDate,
};
