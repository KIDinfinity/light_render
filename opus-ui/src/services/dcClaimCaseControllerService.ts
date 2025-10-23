
import request from '@/utils/request';

export async function getParentClaimNo(params?: any, option?: any): Promise<any> {
  return request('/api/dw/claim/case/th/ap/getParentClaimNo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getParentClaimNo,
}
