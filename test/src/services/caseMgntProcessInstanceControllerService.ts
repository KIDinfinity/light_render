
import request from '@/utils/request';

export async function getProcessInstanceProgress(params?: any, option?: any): Promise<any> {
  return request('/api/case/mgnt/processInstance/getProcessInstanceProgress', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function getProcessOverview(params?: any, option?: any): Promise<any> {
  return request('/api/case/mgnt/processInstance/getProcessOverview', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getProcessInstanceProgress,
  getProcessOverview,
}
