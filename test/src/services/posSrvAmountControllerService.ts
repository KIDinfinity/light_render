import request from '@/utils/request';

export async function inquiry(params?: any, option?: any): Promise<any> {
  return request('/api/srv/amount/limit/inquiry', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  inquiry,
};
