import lodash from 'lodash';

export function getSelectInsuredInfo({
  clientInfoList,
  selectedClientId,
  selectedPolicyId,
}: any) {
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
    'partyId',
    'memberNo',
    'partySource',
    'address',
  ];
  const newInsuredInfo: any = lodash.pick(
    lodash
      .chain(clientInfoList)
      .filter((item) => item.clientId === selectedClientId)
      .value()[0],
    insuredInfoKeyArr
  );
  newInsuredInfo.policyId = selectedPolicyId;
  newInsuredInfo.insuredId = newInsuredInfo?.clientId;
  newInsuredInfo.email = newInsuredInfo.emailAddress || newInsuredInfo.email;
  newInsuredInfo.occupation = newInsuredInfo.occupationCode || newInsuredInfo.occupation;
  return newInsuredInfo;
}

export default getSelectInsuredInfo;
