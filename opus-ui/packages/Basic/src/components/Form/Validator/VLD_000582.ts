import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';

export const VLD_000582 = (expenseValue: any) => (rule: any, value: any, callback: Function) => {
  const otherInsurerPaidAmountValue = formUtils.queryValue(value);

  if (otherInsurerPaidAmountValue > expenseValue) {
    callback(formatMessageApi({ Label_COM_Message: 'MSG_000501' }));
  }

  callback();
};
