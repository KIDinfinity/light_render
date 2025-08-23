import { checkTreatmentPayableDuplicate } from 'claim/pages/Japan/ProcessOfJPCLM/JPCLMOfAssessment/_models/functions/claimPayableFunc';
import { formatMessageApi } from '@/utils/dictFormatMessage';

/**
 * 校验treatment payable的benefitItemCode值的重复性
 *
 * @param treatmentPayableListMap 所有treatment Payable
 * @param treatmentPayableItem 当前修改的treatment payable
 */
export const VLD_000060BenefitItemCode = (
  treatmentPayableListMap: any,
  treatmentPayableItem: any
) => (rule: any, value: any, callback: Function) => {
  if (
    checkTreatmentPayableDuplicate(treatmentPayableListMap, {
      ...treatmentPayableItem,
      benefitItemCode: value,
    })
  ) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000088' }));
  }
  callback();
};
