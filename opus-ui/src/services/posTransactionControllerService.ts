
import request from '@/utils/request';

export async function approvalSubmit(params?: any, option?: any): Promise<any> {
  return request('/rpc/pos/transaction/approvalSubmit', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function autoInforceSubmit(params?: any, option?: any): Promise<any> {
  return request('/rpc/pos/transaction/autoInforceSubmit', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function checkMandatoryDoc(params?: any, option?: any): Promise<any> {
  return request('/rpc/pos/transaction/checkMandatoryDoc', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function complete(params?: any, option?: any): Promise<any> {
  return request('/rpc/pos/transaction/complete', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function createCase(params?: any, option?: any): Promise<any> {
  return request('/rpc/pos/transaction/createCase', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function dataCaptureSubmit(params?: any, option?: any): Promise<any> {
  return request('/rpc/pos/transaction/dataCaptureSubmit', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function inforceSubmit(params?: any, option?: any): Promise<any> {
  return request('/rpc/pos/transaction/inforceSubmit', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function qcSubmit(params?: any, option?: any): Promise<any> {
  return request('/rpc/pos/transaction/qcSubmit', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function reject(params?: any, option?: any): Promise<any> {
  return request('/rpc/pos/transaction/reject', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function underWritingSubmit(params?: any, option?: any): Promise<any> {
  return request('/rpc/pos/transaction/underWritingSubmit', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  approvalSubmit,
  autoInforceSubmit,
  checkMandatoryDoc,
  complete,
  createCase,
  dataCaptureSubmit,
  inforceSubmit,
  qcSubmit,
  reject,
  underWritingSubmit,
}
