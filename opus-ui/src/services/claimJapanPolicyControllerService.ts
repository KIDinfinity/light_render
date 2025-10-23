
import request from '@/utils/request';

export async function getPolicyInfo(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/jp/cr/getPolicyInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listDefaultDocuments(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/jp/cr/listDefaultDocuments', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getPolicyInfo,
  listDefaultDocuments,
}
