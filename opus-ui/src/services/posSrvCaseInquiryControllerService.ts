import request from '@/utils/request';
import { stringify } from 'qs';

export async function getSrvCaseBO(params?: any, option?: any): Promise<any> {
  return request('/api/srv/inquiry/admin/getSrvCaseBO', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getSrvCase(params?: any, option?: any): Promise<any> {
  return request('/api/srv/inquiry/getSrvCase', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findUIConfig(params?: any, option?: any): Promise<any> {
  return request('/api/srv/inquiry/findUIConfig', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getPersonNames(params?: any, option?: any): Promise<any> {
  return request(`/api/srv/inquiry/getPersonName?${stringify(params)}`, {
    ...option,
    method: 'POST',
  });
}

export async function findAllLatestFundPrice(params?: any, option?: any): Promise<any> {
  return request('/api/srv/inquiry/findAllLatestFundPrice', {
    ...option,
    method: 'GET',
  });
}

export async function findAllLatestFundPriceByEffectiveDate(
  params?: any,
  option?: any
): Promise<any> {
  return request(`/api/srv/inquiry/findAllLatestFundPriceByEffectiveDate`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function refreshEffectiveDate(params?: any, option?: any): Promise<any> {
  return request(`/api/srv/operation/refreshEffectiveDate`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getCaseCategoryAndSla(params?: any, option?: any): Promise<any> {
  return request(`/api/srv/inquiry/transaction/getCaseCategoryAndSla?${stringify(params)}`, {
    ...option,
    method: 'GET',
  });
}

export async function getRelCaseInquiryParamVO(params?: any, option?: any): Promise<any> {
  return request('/api/srv/inquiry/getRelCaseInquiryParamVO', {
    ...option,
    method: 'POST',
    body: params,
  });
}
export async function getTimesOfReplacement(params?: any, option?: any): Promise<any> {
  return request(`/api/srv/inquiry/getTimesOfReplacement?${stringify(params)}`, {
    ...option,
    method: 'POST',
  });
}

export async function getLoanQuotation(params?: any, option?: any): Promise<any> {
  return request('/api/srv/inquiry/getLoanQuotation', {
    ...option,
    method: 'POST',
    body: params,
  });
}
export default {
  getSrvCaseBO,
  getSrvCase,
  findUIConfig,
  getPersonNames,
  findAllLatestFundPrice,
  refreshEffectiveDate,
  getCaseCategoryAndSla,
  getTimesOfReplacement,
  getLoanQuotation,
};
