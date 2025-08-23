
import request from '@/utils/request';

export async function cachedUid(params?: any, option?: any): Promise<any> {
  return request('/rpc/idGenerator/cachedUid', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function defaultUid(params?: any, option?: any): Promise<any> {
  return request('/rpc/idGenerator/defaultUid', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function manualSetCurrentNo(params?: any, option?: any): Promise<any> {
  return request('/rpc/idGenerator/manualSetCurrentNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function universal(params?: any, option?: any): Promise<any> {
  return request('/rpc/idGenerator/universal', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function batch(params?: any, option?: any): Promise<any> {
  return request('/rpc/idGenerator/universal/batch', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  cachedUid,
  defaultUid,
  manualSetCurrentNo,
  universal,
  batch,
}
