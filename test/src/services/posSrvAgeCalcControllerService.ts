import request from '@/utils/request';

export async function calcAge(params?: any, option?: any): Promise<any> {
  return request('/api/srv/age/calcAge', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  calcAge,
};
