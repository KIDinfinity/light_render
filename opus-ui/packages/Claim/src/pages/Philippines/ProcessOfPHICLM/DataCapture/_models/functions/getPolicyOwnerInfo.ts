import lodash from 'lodash';

export function getPolicyOwnerInfo(source: object) {
  const findKey = [
    'insuredId',
    'clientId',
    'middleName',
    'firstName',
    'surname',
    'extName',
    'gender',
    'dateOfBirth',
    'nationality',
    'identityType',
    'identityNo',
    'occupation',
    'email',
    'phoneNo',
    'address',
    'memberNo',
    'partySource',
  ];
  const newInsuredInfo: any = lodash.pick(source, findKey);
  newInsuredInfo.insuredId = newInsuredInfo.clientId || newInsuredInfo.insuredId;
  return newInsuredInfo;
}

export default getPolicyOwnerInfo;
