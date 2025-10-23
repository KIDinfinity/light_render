
import request from '@/utils/request';

export async function saveEws(params?: any, option?: any): Promise<any> {
  return request('/rpc/dc/proposal/saveEws', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  saveEws,
}
