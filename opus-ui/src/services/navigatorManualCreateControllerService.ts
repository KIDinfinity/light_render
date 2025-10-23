
import request from '@/utils/request';

export async function refreshData(params?: any, option?: any): Promise<any> {
  return request('/api/navigator/cases/refreshData', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  refreshData,
}
