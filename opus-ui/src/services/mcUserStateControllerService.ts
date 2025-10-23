
import request from '@/utils/request';

export async function changeUserState(params?: any, option?: any): Promise<any> {
  return request('/rpc/mc/userstate/changeUserState', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  changeUserState,
}
