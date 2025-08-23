
import request from '@/utils/request';

export async function searchHistoryClaimCase(params?: any, option?: any): Promise<any> {
  return request('/api/claim/th/unknown/doc/searchHistoryClaimCase', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  searchHistoryClaimCase,
}
