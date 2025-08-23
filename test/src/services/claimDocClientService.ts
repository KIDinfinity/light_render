
import request from '@/utils/request';

export async function getCaseRelevantDocViews(params?: any, option?: any): Promise<any> {
  return request('/rpc/doc/getCaseRelevantDocViews', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listJpDocConfigsByDocTypeCodes(params?: any, option?: any): Promise<any> {
  return request('/rpc/doc/listJpDocConfigsByDocTypeCodes', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function listNotReceivedMandatoryDoc(params?: any, option?: any): Promise<any> {
  return request('/rpc/doc/listNotReceivedMandatoryDoc', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getCaseRelevantDocViews,
  listJpDocConfigsByDocTypeCodes,
  listNotReceivedMandatoryDoc,
}
