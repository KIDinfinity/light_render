
import request from '@/utils/request';

export async function searchBankByBranchCodes(params?: any, option?: any): Promise<any> {
  return request('/api/c360/searchBankByBranchCodes', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function searchBankCode(params?: any, option?: any): Promise<any> {
  return request('/api/c360/searchBankCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function searchBranchCode(params?: any, option?: any): Promise<any> {
  return request('/api/c360/searchBranchCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function searchByBranchCodes(params?: any, option?: any): Promise<any> {
  return request('/api/c360/searchByBranchCodes', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function searchByCodes(params?: any, option?: any): Promise<any> {
  return request('/api/c360/searchByCodes', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  searchBankByBranchCodes,
  searchBankCode,
  searchBranchCode,
  searchByBranchCodes,
  searchByCodes,
}
