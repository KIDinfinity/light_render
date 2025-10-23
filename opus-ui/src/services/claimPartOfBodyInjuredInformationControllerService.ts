
import request from '@/utils/request';

export async function partOfBodyInjured(params?: any, option?: any): Promise<any> {
  return request('/api/claim/dropdown/partOfBodyInjured', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function partOfBodyInjuredByRegion(params?: any, option?: any): Promise<any> {
  return request('/api/claim/dropdown/partOfBodyInjuredByRegion', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function partOfBodyInjuredForPage(params?: any, option?: any): Promise<any> {
  return request('/api/claim/dropdown/partOfBodyInjuredForPage', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function partOfBodyInjuredForPageByRegion(params?: any, option?: any): Promise<any> {
  return request('/api/claim/dropdown/partOfBodyInjuredForPageByRegion', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function searchName(params?: any, option?: any): Promise<any> {
  return request('/api/claim/dropdown/partOfBodyInjuredInformation/searchName', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function searchNameByRegion(params?: any, option?: any): Promise<any> {
  return request('/api/claim/dropdown/partOfBodyInjuredInformation/searchNameByRegion', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  partOfBodyInjured,
  partOfBodyInjuredByRegion,
  partOfBodyInjuredForPage,
  partOfBodyInjuredForPageByRegion,
  searchName,
  searchNameByRegion,
}
