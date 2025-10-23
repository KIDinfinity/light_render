
import request from '@/utils/request';

export async function updateBusinessProcess(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/v2/business/process/updateBusinessProcess', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function updateOperationDate(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/v2/business/process/updateOperationDate', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  updateBusinessProcess,
  updateOperationDate,
}
