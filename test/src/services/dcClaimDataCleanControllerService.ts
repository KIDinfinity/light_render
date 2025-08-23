
import request from '@/utils/request';

export async function cleanAllClaimCaseData(params?: any, option?: any): Promise<any> {
  return request('/api/dw/claim/clean/cleanAllClaimCaseData', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function cleanClaimHistoryData(params?: any, option?: any): Promise<any> {
  return request('/api/dw/claim/clean/cleanClaimHistoryData', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  cleanAllClaimCaseData,
  cleanClaimHistoryData,
}
