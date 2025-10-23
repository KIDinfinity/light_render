
import request from '@/utils/request';

export async function getCategroyReason(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/cases/info/getCategroyReason', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function saveInformation(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/cases/info/saveInformation', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getCategroyReason,
  saveInformation,
}
