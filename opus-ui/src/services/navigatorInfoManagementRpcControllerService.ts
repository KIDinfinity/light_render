
import request from '@/utils/request';

export async function cleanNotice(params?: any, option?: any): Promise<any> {
  return request('/rpc/navigator/info/cleanNotice', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findBusinessCheckInfo(params?: any, option?: any): Promise<any> {
  return request('/rpc/navigator/info/findBusinessCheckInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function refreshNotices(params?: any, option?: any): Promise<any> {
  return request('/rpc/navigator/info/refreshNotices', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function saveBatch(params?: any, option?: any): Promise<any> {
  return request('/rpc/navigator/info/saveBatch', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function saveBatchInformationReference(params?: any, option?: any): Promise<any> {
  return request('/rpc/navigator/info/saveBatchInformationReference', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function saveBatchLinkTo(params?: any, option?: any): Promise<any> {
  return request('/rpc/navigator/info/saveBatchLinkTo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function saveLinkToCaseByDocumentIds(params?: any, option?: any): Promise<any> {
  return request('/rpc/navigator/info/saveLinkToCaseByDocumentIds', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  cleanNotice,
  findBusinessCheckInfo,
  refreshNotices,
  saveBatch,
  saveBatchInformationReference,
  saveBatchLinkTo,
  saveLinkToCaseByDocumentIds,
}
