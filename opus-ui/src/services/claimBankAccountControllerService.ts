
import request from '@/utils/request';

export async function getClaimBankAccount(params?: any, option?: any): Promise<any> {
  return request('/api/claim/dropdown/getClaimBankAccount', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getClaimBankAccount,
}
