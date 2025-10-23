
import request from '@/utils/request';

export async function updateIndicatorInfo(params?: any, option?: any): Promise<any> {
  return request('/api/claim/indicator/updateIndicatorInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  updateIndicatorInfo,
}
