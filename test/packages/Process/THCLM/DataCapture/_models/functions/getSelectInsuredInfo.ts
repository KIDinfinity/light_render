import lodash from 'lodash';

export function getSelectInsuredInfo(source: any) {
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
    'occupationCode',
    'email',
    'emailAddress',
    'phoneNo',
    'postCode',
    'partyId',
    'memberNo',
    'partySource',
    'address',
    'relativeClientIdList',
    'policyId',
  ];

  const newInsuredInfo: any = lodash.pick(source, insuredInfoKeyArr);

  // if (!skipPolicyNo) newInsuredInfo.policyId = lodash.first(source.policyIdList);
  newInsuredInfo.insuredId = source.clientId;
  newInsuredInfo.email = newInsuredInfo.emailAddress || newInsuredInfo.email;
  newInsuredInfo.occupation = newInsuredInfo.occupationCode || newInsuredInfo.occupation;

  return newInsuredInfo;
}

export default getSelectInsuredInfo;
