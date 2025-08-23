
import request from '@/utils/request';

export async function encrypt(params?: any, option?: any): Promise<any> {
  return request('/rpc/ruleEngine/sensitive/encrypt', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function factContentEncry(params?: any, option?: any): Promise<any> {
  return request('/rpc/ruleEngine/sensitive/factContentEncry', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getGev(params?: any, option?: any): Promise<any> {
  return request('/rpc/ruleEngine/sensitive/getGev', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getSenstive(params?: any, option?: any): Promise<any> {
  return request('/rpc/ruleEngine/sensitive/getSenstive', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function testEncryption(params?: any, option?: any): Promise<any> {
  return request('/rpc/ruleEngine/sensitive/testEncryption', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  encrypt,
  factContentEncry,
  getGev,
  getSenstive,
  testEncryption,
}
