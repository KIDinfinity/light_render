import request from '@/utils/request';

export async function productList(params?: any, option?: any): Promise<any> {
  return request('/api/pc/getProductList', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function productDetail(params?: any, option?: any): Promise<any> {
  return request('/api/pc/getProductDetail', {
    ...option,
    method: 'POST',
    body: params,
  });
}