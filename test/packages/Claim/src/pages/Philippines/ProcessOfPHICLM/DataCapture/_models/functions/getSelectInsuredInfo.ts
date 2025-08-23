import lodash from 'lodash';

export function getSelectInsuredInfo(source: object, skipPolicyNo: boolean) {
  const insuredInfoKeyArr = [
    'insuredId',
    'clientId',
    'middleName',
    'firstName',
    'surname',
    'extName',
    'gender',
    'identityType',
    'identityNo',
    'dateOfBirth',
    'nationality',
    'occupation',
    'email',
    'phoneNo',
    'partyId',
    'memberNo',
    'partySource',
    'address',
  ];

  const newInsuredInfo = lodash.pick(source, insuredInfoKeyArr);
  if (!skipPolicyNo) newInsuredInfo.policyId = source.policyIdList[0];
  newInsuredInfo.insuredId = source.clientId;
  return newInsuredInfo;
}

export default getSelectInsuredInfo;
