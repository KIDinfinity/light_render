import { stringify } from 'qs';
import request from '@/utils/request';

export async function searchAllBranchCode(params?: any, option?: any): Promise<any> {
  return request('/api/misc/bank/searchAllBranchCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function searchAllCfgBankCode(params?: any, option?: any): Promise<any> {
  return request(`/api/misc/bank/searchAllCfgBankCode?${stringify(params)}`, {
    ...option,
  });
}

export async function searchAllCfgBranchCode(params?: any, option?: any): Promise<any> {
  return request(`/api/misc/bank/searchAllCfgBranchCode?${stringify(params)}`, {
    ...option,
  });
}

export async function searchBankAndBranchByRegionCode(params?: any, option?: any): Promise<any> {
  return request('/api/misc/bank/searchBankAndBranchByRegionCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function searchBankByBranchCodes(params?: any, option?: any): Promise<any> {
  return request('/api/misc/bank/searchBankByBranchCodes', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function searchBankCode(params?: any, option?: any): Promise<any> {
  return request('/api/misc/bank/searchBankCode', {
    localCache: true,
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function searchBankDirectSell(params?: any, option?: any): Promise<any> {
  return request('/api/misc/bank/searchBankDirectSell', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function searchBranchCode(params?: any, option?: any): Promise<any> {
  return request('/api/misc/bank/searchBranchCode', {
    localCache: true,
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function searchByBankCodeAndBranchCodesAndRegionCode(
  params?: any,
  option?: any
): Promise<any> {
  return request('/api/misc/bank/searchByBankCodeAndBranchCodesAndRegionCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function searchByBranchCodes(params?: any, option?: any): Promise<any> {
  return request('/api/misc/bank/searchByBranchCodes', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function searchByBranchCodesAndRegionCode(params?: any, option?: any): Promise<any> {
  return request('/api/misc/bank/searchByBranchCodesAndRegionCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function searchByCodes(params?: any, option?: any): Promise<any> {
  return request('/api/misc/bank/searchByCodes', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function searchByCodesAndRegionCode(params?: any, option?: any): Promise<any> {
  return request('/api/misc/bank/searchByCodesAndRegionCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function shearchAllBankCode(params?: any, option?: any): Promise<any> {
  return request('/api/misc/bank/shearchAllBankCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findAllByRegion(params?: any, option?: any): Promise<any> {
  return request('/api/misc/bank/findAllByRegion', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findAllByRegionV2(params?: any, option?: any): Promise<any> {
  return request('/api/misc/bank/findAllByRegionV2', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findByRegionAndBankCode(params?: any, option?: any): Promise<any> {
  return request(`/api/misc/bank/findByRegionAndBankCode?${stringify(params)}`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  searchAllBranchCode,
  searchAllCfgBankCode,
  searchAllCfgBranchCode,
  searchBankAndBranchByRegionCode,
  searchBankByBranchCodes,
  searchBankCode,
  searchBankDirectSell,
  searchBranchCode,
  searchByBankCodeAndBranchCodesAndRegionCode,
  searchByBranchCodes,
  searchByBranchCodesAndRegionCode,
  searchByCodes,
  searchByCodesAndRegionCode,
  shearchAllBankCode,
  findAllByRegion,
  findByRegionAndBankCode,
  findAllByRegionV2,
};
