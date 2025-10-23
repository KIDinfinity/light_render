
import request from '@/utils/request';

export async function findDictionaryByDictName(params?: any, option?: any): Promise<any> {
  return request('/rpc/misc/dictionary/findDictionaryByDictName', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function findDictionaryByTypeCodesWithoutLanguage(params?: any, option?: any): Promise<any> {
  return request('/rpc/misc/dictionary/findDictionaryByTypeCodesWithoutLanguage', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getDictCodeByNameAndType(params?: any, option?: any): Promise<any> {
  return request('/rpc/misc/dictionary/getDictCodeByNameAndType', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getRegionCodeBeforeLogin(params?: any, option?: any): Promise<any> {
  return request('/rpc/misc/dictionary/getRegionCodeBeforeLogin', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function queryByCode(params?: any, option?: any): Promise<any> {
  return request('/rpc/misc/dictionary/queryByCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function queryByCodeList(params?: any, option?: any): Promise<any> {
  return request('/rpc/misc/dictionary/queryByCodeList', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function queryByTypeCode(params?: any, option?: any): Promise<any> {
  return request('/rpc/misc/dictionary/queryByTypeCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function queryByTypeCode2(params?: any, option?: any): Promise<any> {
  return request('/rpc/misc/dictionary/queryByTypeCode2', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function queryByTypeCodeFullSetOnly(params?: any, option?: any): Promise<any> {
  return request('/rpc/misc/dictionary/queryByTypeCodeFullSetOnly', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function queryDictName(params?: any, option?: any): Promise<any> {
  return request('/rpc/misc/dictionary/queryDictName', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function queryDictNameByMessageCode(params?: any, option?: any): Promise<any> {
  return request('/rpc/misc/dictionary/queryDictNameByMessageCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function queryMiscDictAmlCountry(params?: any, option?: any): Promise<any> {
  return request('/rpc/misc/dictionary/queryMiscDictAmlCountry', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  findDictionaryByDictName,
  findDictionaryByTypeCodesWithoutLanguage,
  getDictCodeByNameAndType,
  getRegionCodeBeforeLogin,
  queryByCode,
  queryByCodeList,
  queryByTypeCode,
  queryByTypeCode2,
  queryByTypeCodeFullSetOnly,
  queryDictName,
  queryDictNameByMessageCode,
  queryMiscDictAmlCountry,
}
