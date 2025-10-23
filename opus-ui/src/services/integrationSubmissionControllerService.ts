import request from '@/utils/request';

export async function submitRequest(params?: any, option?: any): Promise<any> {
  return request('/api/integration/submission/submitRequest', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function saveDocData(params?: any, option?: any): Promise<any> {
  return request('/api/integration/submission/saveDocData', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  submitRequest,
  saveDocData,
};
