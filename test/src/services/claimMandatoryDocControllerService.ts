
import request from '@/utils/request';

export async function checkMandatoryDoc(params?: any, option?: any): Promise<any> {
  return request('/api/claim/mandatory/doc/checkMandatoryDoc', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function updateMandatoryDoc(params?: any, option?: any): Promise<any> {
  return request('/api/claim/mandatory/doc/updateMandatoryDoc', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  checkMandatoryDoc,
  updateMandatoryDoc,
}
