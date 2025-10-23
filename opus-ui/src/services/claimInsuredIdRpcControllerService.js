import request from '@/utils/request';

export async function getNameAndGenderAndDateOfBirthByClaimInsuredId(params) {
  return request('/rpc/claim/getNameAndGenderAndDateOfBirthByClaimInsuredId', {
    method: 'POST',
    body: params,
  });
}

export default {
  getNameAndGenderAndDateOfBirthByClaimInsuredId,
};
