import { useMemo } from 'react';
import { formUtils } from 'basic/components/Form';

import { EBoolean, EPaymentMethod } from 'basic/enum';

interface useHookParams {
  payeeItem: any;
}
export default ({ payeeItem }: useHookParams) => {
  const paymentMethod = formUtils.queryValue(payeeItem?.paymentMethod);
  const isDefaultPaymentMethod = formUtils.queryValue(payeeItem?.isDefaultPaymentMethod);

  const disabledConfig = useMemo(() => {
    return {
      telNo:
        isDefaultPaymentMethod === EBoolean.YesLetter &&
        (paymentMethod === EPaymentMethod.ElevenCash ||
          paymentMethod === EPaymentMethod.FasterPayment),
      email:
        isDefaultPaymentMethod === EBoolean.YesLetter &&
        (paymentMethod === EPaymentMethod.ElevenCash ||
          paymentMethod === EPaymentMethod.FasterPayment),
      contactType:
        isDefaultPaymentMethod === EBoolean.YesLetter &&
        paymentMethod === EPaymentMethod.FasterPayment,
    };
  }, [paymentMethod, isDefaultPaymentMethod]);

  return { disabledConfig };
};
