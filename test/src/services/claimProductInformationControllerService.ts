
import request from '@/utils/request';

export async function searchName(params?: any, option?: any): Promise<any> {
  return request('/api/claim/dropdown/product/searchName', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function searchNameByRegion(params?: any, option?: any): Promise<any> {
  return request('/api/claim/dropdown/product/searchNameByRegion', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function productInfo(params?: any, option?: any): Promise<any> {
  return request('/api/claim/dropdown/productInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function productInfoByRegion(params?: any, option?: any): Promise<any> {
  return request('/api/claim/dropdown/productInfoByRegion', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function productInfoForPage(params?: any, option?: any): Promise<any> {
  return request('/api/claim/dropdown/productInfoForPage', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function productInfoForPageByRegion(params?: any, option?: any): Promise<any> {
  return request('/api/claim/dropdown/productInfoForPageByRegion', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getDictProduct(params?: any, option?: any): Promise<any> {
  return request('/api/claim/dropdown/product/getDictProduct', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  searchName,
  searchNameByRegion,
  productInfo,
  productInfoByRegion,
  productInfoForPage,
  productInfoForPageByRegion,
  getDictProduct
}
