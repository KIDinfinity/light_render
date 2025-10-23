import request from '@/utils/request';

export async function nationality(params?: any, option?: any): Promise<any> {
  return request('/api/misc/dropdown/nationality', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function searchByRegionCode(params?: any, option?: any): Promise<any> {
  return request('/api/misc/dropdown/nationality/searchByRegionCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function searchName(params?: any, option?: any): Promise<any> {
  return request('/api/misc/dropdown/nationality/searchName', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  nationality,
  searchByRegionCode,
  searchName,
};
