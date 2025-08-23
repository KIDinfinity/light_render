
import request from '@/utils/request';

export async function searchFactoringHouseByBranchCodes(params?: any, option?: any): Promise<any> {
  return request('/rpc/c360/searchFactoringHouseByBranchCodes', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  searchFactoringHouseByBranchCodes,
}
