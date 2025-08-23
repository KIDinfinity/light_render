
import request from '@/utils/request';

export async function getC360ClaimInfo(params?: any, option?: any): Promise<any> {
  return request('/api/c360/claim/getC360ClaimInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getC360ClaimInfo,
}
