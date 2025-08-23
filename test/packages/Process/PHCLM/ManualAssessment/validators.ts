import {
  collectSectionErrors,
  validatePolicyAgent,
  VLD_000551,
} from 'claimBasicProduct/pages/validators';
import { formUtils } from 'basic/components/Form';
import { VLD_000185, VLD_000351 } from 'claim/pages/validators/sectionValidators';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { getNotRegisterPayablePolicyNo } from './_models/functions/utils';

export { VLD_000351 };
// if all the policy benefits have been registered
export const VLD_000907 = (claimEntities: any) => {
  const notRegisterPolicyNos = getNotRegisterPayablePolicyNo(claimEntities);

  if (notRegisterPolicyNos.length <= 0) {
    const errorMessage = {
      code: 'VLD_000907',
      typeCode: 'Label_COM_ErrorMessage',
      dictCode: 'MSG_000399',
    }
    return errorMessage;
  }
  return undefined;
};
// if not all the policy benefits have been registered
export const VLD_000365 = (claimEntities: any) => {
  const notRegisterPolicyNos = getNotRegisterPayablePolicyNo(claimEntities);
  if (notRegisterPolicyNos.length > 0) {
    return formatMessageApi(
      { Label_COM_ErrorMessage: 'MSG_000383' },
      notRegisterPolicyNos
    ) as string;
  }
  return undefined;
};
// if selected benefit has been registered.
export const VLD_000343 = (benefitItem: any, isSeries?: boolean) => {
  let isError = false;
  if (!isSeries) {
    isError = benefitItem?.regularSeqNo;
  } else {
    isError = !!benefitItem?.children?.some((child: any) => child?.regularSeqNo);
  }

  if (isError) {
    return formatMessageApi({ Label_COM_ErrorMessage: 'MSG_000382' }) as string;
  }
  return undefined;
};

export const VLD_001083 = (policyBenefitList = [], beneficiaryListMap = {}) => {
  const advancedPaymentIdList = policyBenefitList.flatMap(({ beneficiaryList }) => 
    beneficiaryList?.filter(beneficiaryId => !!formUtils.queryValue(beneficiaryListMap[beneficiaryId]?.advancedPayoutAmount)) || []);
  if(advancedPaymentIdList.length > 1) {
    return formatMessageApi({ Label_COM_ErrorMessage: 'MSG_001204' })
  }
  return void 0;
}

// 统计section错误
export const sectionErrors = (claimProcessData: any, submited: boolean, claimEntities: any) => {
  if (!claimProcessData || !submited) {
    return [];
  }

  const errors: string[] = [
    ...collectSectionErrors(claimProcessData, submited),
    ...validatePolicyAgent(claimProcessData),
    ...VLD_000551(claimProcessData, submited),
    ...VLD_000185(claimEntities),
  ];
  return errors;
};
