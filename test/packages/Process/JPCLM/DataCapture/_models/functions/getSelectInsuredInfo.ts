import lodash from 'lodash';
import { calcAge } from '@/utils/utils';
import { formUtils } from 'basic/components/Form';

export function getSelectInsuredInfo(
  source: any,
  skipPolicyNo: boolean,
  taskDetail: any,
  submissionDate: any
) {
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
    'address2',
    'postCode',
  ];

  const curSubmissionDate = formUtils.queryValue(submissionDate || taskDetail?.submissionDate);

  const newInsuredInfo: any = lodash.pick(source, insuredInfoKeyArr);
  if (!skipPolicyNo)
    newInsuredInfo.policyId = lodash.chain(source.policyIdList).compact().first().value();
  newInsuredInfo.insuredId = source.clientId;
  newInsuredInfo.email = newInsuredInfo.emailAddress || newInsuredInfo.email;
  newInsuredInfo.occupation = newInsuredInfo.occupationCode || newInsuredInfo.occupation;
  // newInsuredInfo.telNo = newInsuredInfo.phoneNo;
  newInsuredInfo.age = calcAge(newInsuredInfo?.dateOfBirth, curSubmissionDate);

  return newInsuredInfo;
}

export default getSelectInsuredInfo;
