
import request from '@/utils/request';

export async function requestClientInfo(params?: any, option?: any): Promise<any> {
  return request('/api/c360/clientInfo/requestClientInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  requestClientInfo,
}
