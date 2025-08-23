
import request from '@/utils/request';

export async function manualSetCurrentNo(params?: any, option?: any): Promise<any> {
  return request('/api/idGenerator/manualSetCurrentNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function universal(params?: any, option?: any): Promise<any> {
  return request('/api/idGenerator/universal', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function batch(params?: any, option?: any): Promise<any> {
  return request('/api/idGenerator/universal/batch', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  manualSetCurrentNo,
  universal,
  batch,
}
