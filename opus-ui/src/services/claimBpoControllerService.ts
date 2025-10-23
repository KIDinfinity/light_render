
import request from '@/utils/request';

export async function businessCheck(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/jp/bpo/businessCheck', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findBpoDocumentData(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/jp/bpo/findBpoDocumentData', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function upload(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/jp/bpo/upload', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function v2(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/jp/bpo/upload/v2', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  businessCheck,
  findBpoDocumentData,
  upload,
  v2,
}
