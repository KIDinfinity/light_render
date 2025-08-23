import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';

export const VLD_000736 = (payableItem: any) => (rule: any, value: any, callback: Function) => {
  if (value > formUtils.queryValue(payableItem?.payableAmountBeforeDeductible)) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000710' }, payableItem?.policyNo));
  }
  callback();
};
