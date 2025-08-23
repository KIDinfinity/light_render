import request from '@/utils/request';

export async function medicalProvider(params?: any, option?: any): Promise<any> {
  return request('/api/claim/dropdown/medicalProvider', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function searchInfo(params?: any, option?: any): Promise<any> {
  return request('/api/claim/dropdown/medicalProvider/searchInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function searchInfoByRegionCode(params?: any, option?: any): Promise<any> {
  return request('/api/claim/dropdown/medicalProvider/searchInfoByRegionCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function searchName(params?: any, option?: any): Promise<any> {
  return request('/api/claim/dropdown/medicalProvider/searchName', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function searchNameByRegionCode(params?: any, option?: any): Promise<any> {
  return request('/api/claim/dropdown/medicalProvider/searchNameByRegionCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function medicalProviderByRegionCode(params?: any, option?: any): Promise<any> {
  return request('/api/claim/dropdown/medicalProviderByRegionCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function medicalProviderForPage(params?: any, option?: any): Promise<any> {
  return request('/api/claim/dropdown/medicalProviderForPage', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function medicalProviderForPageByRegionCode(params?: any, option?: any): Promise<any> {
  return request('/api/claim/dropdown/medicalProviderForPageByRegionCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function searchMedicalProvider(params?: any, option?: any): Promise<any> {
  return request('/api/claim/dropdown/searchMedicalProvider', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function searchMedicalProviderPlaceByRegionCode(
  params?: any,
  option?: any
): Promise<any> {
  return request('/api/claim/medicalProvider/searchMedicalProviderPlaceByRegionCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  medicalProvider,
  searchInfo,
  searchInfoByRegionCode,
  searchName,
  searchNameByRegionCode,
  medicalProviderByRegionCode,
  medicalProviderForPage,
  medicalProviderForPageByRegionCode,
  searchMedicalProvider,
  searchMedicalProviderPlaceByRegionCode,
};
