
import request from '@/utils/request';

export async function checkPendingDocument(params?: any, option?: any): Promise<any> {
  return request('/rpc/th/document/checkPendingDocument', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function mockCheckPending(params?: any, option?: any): Promise<any> {
  return request('/rpc/th/document/mockCheckPending', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  checkPendingDocument,
  mockCheckPending,
}
