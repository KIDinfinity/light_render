
import request from '@/utils/request';

export async function getHospitalBilling(params?: any, option?: any): Promise<any> {
  return request('/api/claim/hospital/billing/getHospitalBilling', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getHospitalBillingByCoverPageNo(params?: any, option?: any): Promise<any> {
  return request('/api/claim/hospital/billing/getHospitalBillingByCoverPageNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getHospitalBillingDetail(params?: any, option?: any): Promise<any> {
  return request('/api/claim/hospital/billing/getHospitalBillingDetail', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getHospitalName(params?: any, option?: any): Promise<any> {
  return request('/api/claim/hospital/billing/getHospitalName', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getIdentify(params?: any, option?: any): Promise<any> {
  return request('/api/claim/hospital/billing/getIdentify', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submit(params?: any, option?: any): Promise<any> {
  return request('/api/claim/hospital/billing/submit', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function submitIdentify(params?: any, option?: any): Promise<any> {
  return request('/api/claim/hospital/billing/submitIdentify', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function updateHospitalBillingDetailStatus(params?: any, option?: any): Promise<any> {
  return request('/api/claim/hospital/billing/updateHospitalBillingDetailStatus', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getHospitalBilling,
  getHospitalBillingByCoverPageNo,
  getHospitalBillingDetail,
  getHospitalName,
  getIdentify,
  submit,
  submitIdentify,
  updateHospitalBillingDetailStatus,
}
