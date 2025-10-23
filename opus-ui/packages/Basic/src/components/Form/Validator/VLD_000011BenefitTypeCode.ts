import { checkClaimPayableDuplicate } from 'claim/pages/Japan/ProcessOfJPCLM/JPCLMOfAssessment/_models/functions/claimPayableFunc';
import { PolicySetupStatus } from 'claim/pages/Japan/ProcessOfJPCLM/utils/constant';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';

/**
 * 校验claimpayable的benefitTypeCode值的重复性
 * @param claimPayableListMap 所有claim payable
 * @param incidentPayable 当前修改的claim payable
 */
export const VLD_000011BenefitTypeCode = (claimPayableListMap: any, incidentPayable: any) => (
  rule: any,
  value: any,
  callback: Function
) => {
  if (
    formUtils.queryValue(incidentPayable.policySetupStatus) === PolicySetupStatus.Standard &&
    checkClaimPayableDuplicate(claimPayableListMap, { ...incidentPayable, benefitTypeCode: value })
  ) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000021' }));
  }
  callback();
};
