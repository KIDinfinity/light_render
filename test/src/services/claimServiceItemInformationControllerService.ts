
import request from '@/utils/request';

export async function searchServiceItemByPage(params?: any, option?: any): Promise<any> {
  return request('/api/claim/dropdown/searchServiceItemByPage', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function serviceItem(params?: any, option?: any): Promise<any> {
  return request('/api/claim/dropdown/serviceItem', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function searchName(params?: any, option?: any): Promise<any> {
  return request('/api/claim/dropdown/serviceItem/searchName', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function searchNameByRegionCode(params?: any, option?: any): Promise<any> {
  return request('/api/claim/dropdown/serviceItem/searchNameByRegionCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function serviceItemByRegionCode(params?: any, option?: any): Promise<any> {
  return request('/api/claim/dropdown/serviceItemByRegionCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function serviceItemForPage(params?: any, option?: any): Promise<any> {
  return request('/api/claim/dropdown/serviceItemForPage', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function serviceItemForPageByRegionCode(params?: any, option?: any): Promise<any> {
  return request('/api/claim/dropdown/serviceItemForPageByRegionCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function searchRepeatableByRegionCode(params?: any, option?: any): Promise<any> {
  return request('/api/claim/serviceItem/searchRepeatableByRegionCode', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  searchServiceItemByPage,
  serviceItem,
  searchName,
  searchNameByRegionCode,
  serviceItemByRegionCode,
  serviceItemForPage,
  serviceItemForPageByRegionCode,
  searchRepeatableByRegionCode,
}
