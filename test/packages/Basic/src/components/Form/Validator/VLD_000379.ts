import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { EPaymentMethod } from 'claim/pages/PaymentAllocation/_dto/Enums';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000379 = (payeeItem: any) => {
  const payeeBankAccountList = payeeItem?.payeeBankAccountList;
  const paymentMethod = formUtils.queryValue(payeeItem?.paymentMethod);

  if (
    (paymentMethod === EPaymentMethod.BankTransfer ||
      paymentMethod === EPaymentMethod.DirectCredit) &&
    lodash.every(payeeBankAccountList, (item) => !formUtils.queryValue(item.isSelect))
  ) {
    return formatMessageApi({ Label_COM_ErrorMessage: 'MSG_000400' });
  }
  return false;
};
