import { checkLifePayableDuplicate } from 'claim/pages/Japan/ProcessOfJPCLM/JPCLMOfAssessment/_models/functions/claimPayableFunc';
import { formatMessageApi } from '@/utils/dictFormatMessage';

/**
 * 校验life payable的benefitItemCode值的重复性
 * @param claimPayableListMap 所有claim payable
 * @param incidentPayable 当前修改的claim payable
 */
export const VLD_000059 = (claimPayableListMap: any, incidentPayable: any) => (
  rule: any,
  value: any,
  callback: Function
) => {
  if (
    checkLifePayableDuplicate(claimPayableListMap, {
      ...incidentPayable,
      lifePayable: { ...incidentPayable.lifePayable, benefitItemCode: value },
    })
  ) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000088' }));
  }
  callback();
};
