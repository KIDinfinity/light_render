import { stringify } from 'qs';
import request from '@/utils/request';

export async function find(params?: any, option?: any): Promise<any> {
  return request('/api/misc/dictionary/find', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findCaseCategoryDictionaries(params?: any, option?: any): Promise<any> {
  return request('/api/misc/dictionary/findCaseCategoryDictionaries', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findDictionariesByTypeCode(params?: any, option?: any): Promise<any> {
  return request('/api/misc/dictionary/findDictionariesByTypeCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findDictionaryByDictName(params?: any, option?: any): Promise<any> {
  return request('/api/misc/dictionary/findDictionaryByDictName', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findDictionaryByTypeCode(params?: any, option?: any): Promise<any> {
  return request('/api/misc/dictionary/findDictionaryByTypeCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findDictionaryByTypeCodes(params?: any, option?: any): Promise<any> {
  return await request('/api/misc/dictionary/findDictionaryByTypeCodes', {
    localCache: true,
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getDictionaryMap(params?: any, option?: any): Promise<any> {
  return request(`/api/misc/dictionary/getDictionaryMap?${stringify(params)}`, {
    ...option,
  });
}

export async function getRegionCodeBeforeLogin(params?: any, option?: any): Promise<any> {
  return request(`/api/misc/dictionary/getRegionCodeBeforeLogin?${stringify(params)}`, {
    ...option,
  });
}

export async function findCaseCategoryByTypeCode(params?: any, option?: any): Promise<any> {
  return request(`/api/misc/dictionary/findCaseCategoryByTypeCode?${stringify(params)}`, {
    ...option,
    method: 'POST',
  });
}

export async function page(params?: any, option?: any): Promise<any> {
  return request('/api/misc/dictionary/page', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function queryByCode(params?: any, option?: any): Promise<any> {
  return request('/api/misc/dictionary/queryByCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function queryByRegionCodeAndCategory(params?: any, option?: any): Promise<any> {
  return request('/api/misc/dictionary/queryByRegionCodeAndCategory', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function searchName(params?: any, option?: any): Promise<any> {
  return request('/api/misc/dictionary/searchName', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getLabelDictionary(_?: any, option?: any): Promise<any> {
  return request('/api/misc/dictionary/getLabelDictionary', {
    ...option,
    method: 'GET',
  });
}
export async function getDropdownDictionary(params?: any, option?: any): Promise<any> {
  return request('/api/misc/dictionary/getDropdownDictionary', {
    ...option,
    method: 'POST',
    body: params,
  });
}
export async function getOtherDictionary(params?: any, option?: any): Promise<any> {
  return request('/api/misc/dictionary/getOtherDictionary', {
    ...option,
    method: 'POST',
    body: params,
  });
}
export async function getDictionaryByTypeCode(_?: any, option?: any): Promise<any> {
  return request('/api/misc/dictionary/getDictionaryByTypeCode', {
    ...option,
    method: 'GET',
  });
}
export async function getLoginLabelDictionary(_?: any, option?: any): Promise<any> {
  return request('/api/misc/dictionary/getLoginLabelDictionary', {
    ...option,
    method: 'GET',
  });
}

export async function getSpecialPermissionDictionary(params?: any, option?: any): Promise<any> {
  return request('/api/misc/dictionary/getSpecialPermissionDictionary', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findPermissionSubmissionChannels(params?: any, option?: any): Promise<any> {
  return request('/api/misc/dictionary/findPermissionSubmissionChannels', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  find,
  findCaseCategoryDictionaries,
  findDictionariesByTypeCode,
  findDictionaryByDictName,
  findDictionaryByTypeCode,
  findDictionaryByTypeCodes,
  getDictionaryMap,
  getRegionCodeBeforeLogin,
  page,
  queryByCode,
  queryByRegionCodeAndCategory,
  searchName,
  getLabelDictionary,
  getDropdownDictionary,
  getOtherDictionary,
  getDictionaryByTypeCode,
  getLoginLabelDictionary,
  getSpecialPermissionDictionary,
  findPermissionSubmissionChannels,
};
