import { stringify } from 'qs';
import request from '@/utils/request';

export async function getAddressNameByCodes(params?: any, option?: any): Promise<any> {
  return request('/api/misc/cfg/getAddressNameByCodes', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getAddressSubList(params?: any, option?: any): Promise<any> {
  return request('/api/misc/cfg/getAddressSubList', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getAddressSubListV2(params?: any, option?: any): Promise<any> {
  return request(`/api/misc/cfg/getAddressSubList/v2?${stringify(params)}`, {
    localCache: true,
    ...option,
  });
}
export async function getAddressSubListV3(params?: any, option?: any): Promise<any> {
  return request(`/api/misc/cfg/getAddressSubList/v3?${stringify(params)}`, {
    localCache: true,
    ...option,
  });
}

export async function getAllFundConfigList(params?: any, option?: any): Promise<any> {
  return request('/api/misc/cfg/getAllFundConfigList', {
    localCache: true,
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getAllReasonConfigList(params?: any, option?: any): Promise<any> {
  return request('/api/misc/cfg/getAllReasonConfigList', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getFundConfigByCode(params?: any, option?: any): Promise<any> {
  return request('/api/misc/cfg/getFundConfigByCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getFundConfigListByProductCodeList(params?: any, option?: any): Promise<any> {
  return request('/api/misc/cfg/getFundConfigListByProductCodeList', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getReasonConfigByCode(params?: any, option?: any): Promise<any> {
  return request('/api/misc/cfg/getReasonConfigByCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}
export async function getCitiesByCountry(params?: any, option?: any): Promise<any> {
  return request('/api/misc/cfg/getCitiesByCountry', {
    localCache: true,
    ...option,
    method: 'POST',
    body: params,
  });
}
export async function getFundList(params?: any, option?: any): Promise<any> {
  return request(`/api/srv/policy/getFundList`, {
    localCache: true,
    ...option,
    body: params,
    method: 'POST',
  });
}

export async function getAllFunds(option?: any): Promise<any> {
  return request(`/api/srv/policy/getAllFundConfigList`, {
    ...option,
    method: 'POST',
  });
}

export async function getIdDisplayConfigList(params?: any, option?: any): Promise<any> {
  return request('/api/misc/cfg/getIdDisplayConfigList', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getCfgExclusionListByRegion(params?: any, option?: any): Promise<any> {
  return request('/api/misc/cfg/getCfgExclusionListByRegion', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getSearchDoctorInfo(params?: any, option?: any): Promise<any> {
  return request('/api/misc/cfg/searchDoctorInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getAddressNameByCodes,
  getAddressSubList,
  getAddressSubListV2,
  getAddressSubListV3,
  getAllFundConfigList,
  getAllReasonConfigList,
  getFundConfigByCode,
  getFundConfigListByProductCodeList,
  getReasonConfigByCode,
  getCitiesByCountry,
  getFundList,
  getIdDisplayConfigList,
  getCfgExclusionListByRegion,
  getSearchDoctorInfo,
};
