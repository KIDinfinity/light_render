
import request from '@/utils/request';

export async function cleanAllClaimData(params?: any, option?: any): Promise<any> {
  return request('/api/claim/clean/cleanAllClaimData', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function cleanAllClaimDataByInsuredId(params?: any, option?: any): Promise<any> {
  return request('/api/claim/clean/cleanAllClaimDataByInsuredId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  cleanAllClaimData,
  cleanAllClaimDataByInsuredId,
}
