
import request from '@/utils/request';

export async function findPopUpInfo(params?: any, option?: any): Promise<any> {
  return request('/api/c360/popUp/findPopUpInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  findPopUpInfo,
}
