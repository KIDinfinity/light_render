import request from '@/utils/request';
import { stringify } from 'qs';

export async function saveEditLog(params?: any, option?: any): Promise<any> {
  return request('/api/case/mgnt/task/saveEditLog', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function deleteEditLog(params?: any, option?: any): Promise<any> {
  return request(`/api/case/mgnt/task/deleteEditLog?${stringify(params)}`, {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  saveEditLog,
  deleteEditLog,
};
