import { useMemo } from 'react';
import { formUtils } from 'basic/components/Form';

import { EBoolean, EPaymentMethod } from 'basic/enum';

interface useHookParams {
  payeeItem: any;
}
export default ({ payeeItem }: useHookParams) => {
  const paymentMethod = formUtils.queryValue(payeeItem?.paymentMethod);
  const isDefaultPaymentMethod = formUtils.queryValue(payeeItem?.isDefaultPaymentMethod);

  const disabledConfig: any = useMemo(() => {
    return {
      accountHolder:
        isDefaultPaymentMethod === EBoolean.YesLetter &&
        paymentMethod === EPaymentMethod.DirectCredit,
      bankAccountNo:
        isDefaultPaymentMethod === EBoolean.YesLetter &&
        paymentMethod === EPaymentMethod.DirectCredit,
      bankCode:
        isDefaultPaymentMethod === EBoolean.YesLetter &&
        paymentMethod === EPaymentMethod.DirectCredit,
      bankName:
        isDefaultPaymentMethod === EBoolean.YesLetter &&
        paymentMethod === EPaymentMethod.DirectCredit,
      branchCode:
        isDefaultPaymentMethod === EBoolean.YesLetter &&
        paymentMethod === EPaymentMethod.DirectCredit,
      branchName:
        isDefaultPaymentMethod === EBoolean.YesLetter &&
        paymentMethod === EPaymentMethod.DirectCredit,
      button:
        isDefaultPaymentMethod === EBoolean.YesLetter &&
        paymentMethod === EPaymentMethod.DirectCredit,
    };
  }, [paymentMethod, isDefaultPaymentMethod]);

  return { disabledConfig };
};
