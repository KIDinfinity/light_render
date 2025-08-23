import { checkPolicyNoDuplicate } from 'claim/pages/Japan/ProcessOfJPCLM/JPCLMOfAssessment/_models/functions/claimPayableFunc';
import { formatMessageApi } from '@/utils/dictFormatMessage';

/**
 * 校验claimpayable的policyNo值的重复性
 * @param claimPayableListMap 所有claim payable
 * @param incidentPayable 当前修改的claim payable
 */
export const VLD_000011PolicyNo = (claimPayableListMap: any, incidentPayable: any) => (
  rule: any,
  value: any,
  callback: Function
) => {
  if (checkPolicyNoDuplicate(claimPayableListMap, { ...incidentPayable, policyNo: value })) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000021' }));
  }
  callback();
};
