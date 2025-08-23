
import request from '@/utils/request';

export async function getNameAndGenderAndDateOfBirthByClaimInsuredId(params?: any, option?: any): Promise<any> {
  return request('/rpc/claim/getNameAndGenderAndDateOfBirthByClaimInsuredId', {
    ...option,
    method: 'POST',
    body: params,
  });
}

export default {
  getNameAndGenderAndDateOfBirthByClaimInsuredId,
}
