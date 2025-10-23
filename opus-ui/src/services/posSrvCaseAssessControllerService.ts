import request from '@/utils/request';

export async function re(params?: any, option?: any): Promise<any> {
  return request('/api/srv/assess/re', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  re,
};
