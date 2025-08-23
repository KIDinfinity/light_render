import request from '@/utils/request';

export async function identify(params: any, option?: any): Promise<any> {
  return request('/api/srv/client/identify', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  identify,
};
