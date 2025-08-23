
import request from '@/utils/request';

export async function receiveData(params?: any, option?: any): Promise<any> {
  return request('/rpc/registration/submission/receiveData', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function receiveDataFromNavigator(params?: any, option?: any): Promise<any> {
  return request('/rpc/registration/submission/receiveDataFromNavigator', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function receiveDataToMapCaseDocument(params?: any, option?: any): Promise<any> {
  return request('/rpc/registration/submission/receiveDataToMapCaseDocument', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function test1(params?: any, option?: any): Promise<any> {
  return request('/rpc/registration/submission/test1', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function test2(params?: any, option?: any): Promise<any> {
  return request('/rpc/registration/submission/test2', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function test3(params?: any, option?: any): Promise<any> {
  return request('/rpc/registration/submission/test3', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  receiveData,
  receiveDataFromNavigator,
  receiveDataToMapCaseDocument,
  test1,
  test2,
  test3,
}
