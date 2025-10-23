
import request from '@/utils/request';

export async function getClientBankAccountList(params?: any, option?: any): Promise<any> {
  return request('/api/claim/c360/policyClientBank/hk/getClientBankAccountList', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getClientBankAccountList,
}
