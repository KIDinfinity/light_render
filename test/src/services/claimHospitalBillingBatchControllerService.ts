
import request from '@/utils/request';

export async function getHospitalBillingByClaimNo(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/th/ihb/getHospitalBillingByClaimNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getHospitalBillingDetailByClaimNo(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/th/ihb/getHospitalBillingDetailByClaimNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getPaymentNoByBatchClaimNo(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/th/ihb/getPaymentNoByBatchClaimNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getRegistration(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/th/ihb/getRegistration', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function processInvoice(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/th/ihb/processInvoice', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submit(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/th/ihb/submit', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submitPayment(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/th/ihb/submitPayment', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function updateChange(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/th/ihb/updateChange', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function updateOpdHospitalBillingDetail(params?: any, option?: any): Promise<any> {
  return request('/api/claim/case/th/ihb/updateOpdHospitalBillingDetail', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function cleanInvoiceByClaimHospitalBillingDetails(params?: any, option?: any): Promise<any> {
  return request('/api/claim/hospital/billing/cleanInvoiceByClaimHospitalBillingDetails',{
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getHospitalBillingByClaimNo,
  getHospitalBillingDetailByClaimNo,
  getPaymentNoByBatchClaimNo,
  getRegistration,
  processInvoice,
  submit,
  submitPayment,
  updateChange,
  updateOpdHospitalBillingDetail,
  cleanInvoiceByClaimHospitalBillingDetails,
}
