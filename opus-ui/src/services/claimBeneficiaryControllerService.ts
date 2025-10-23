
import request from '@/utils/request';

export async function loadC360BeneficiaryInfo(params?: any, option?: any): Promise<any> {
  return request('/api/claim/beneficiary/loadC360BeneficiaryInfo', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function reAllocation(params?: any, option?: any): Promise<any> {
  return request('/api/claim/beneficiary/reAllocation', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export async function v2(params?: any, option?: any): Promise<any> {
  return request('/api/claim/beneficiary/reAllocation/v2', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  loadC360BeneficiaryInfo,
  reAllocation,
  v2,
}
