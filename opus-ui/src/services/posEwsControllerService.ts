import request from '@/utils/request';

export async function getEws(params?: any, option?: any): Promise<any> {
  return request('/api/dc/pos/ews/getEws', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getEws,
};
