
import request from '@/utils/request';

export async function updateMandatoryDoc(params?: any, option?: any): Promise<any> {
  return request('/api/doc/management/updateMandatoryDoc', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  updateMandatoryDoc,
}
