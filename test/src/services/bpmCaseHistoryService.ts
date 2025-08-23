
import request from '@/utils/request';

export async function deleteCaseHistory(params?: any, option?: any): Promise<any> {
  return request('/api/bpm/history/deleteCaseHistory', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  deleteCaseHistory,
}
