import { checkOtherProcedureDuplicate } from 'claim/pages/Japan/ProcessOfJPCLM/JPCLMOfAssessment/_models/functions/claimPayableFunc';
import { formatMessageApi } from '@/utils/dictFormatMessage';

/**
 * 校验other procedure的procedure code值的重复性
 *
 * @param treatmentListMap
 * @param otherProcedureListMap
 * @param otherProcedureItem
 */
export const VLD_000060OtherProcedure = (
  treatmentListMap: any,
  otherProcedureListMap: any,
  otherProcedureItem: any
) => (rule: any, value: any, callback: Function) => {
  if (
    checkOtherProcedureDuplicate(treatmentListMap, otherProcedureListMap, {
      ...otherProcedureItem,
      procedureCode: value,
    })
  ) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000090' }));
  }
  callback();
};
