import { useMemo } from 'react';

import { EBoolean, EPaymentMethod } from 'basic/enum';

interface useHookParams {
  form: any;
}
export default ({ form }: useHookParams) => {
  const isDefaultPaymentMethod = form.getFieldValue('isDefaultPaymentMethod');
  const paymentMethod = form.getFieldValue('paymentMethod');

  const disabledConfig = useMemo(
    () => ({
      paymentMethod: isDefaultPaymentMethod === EBoolean.YesLetter,
      subPaymentMethod:
        paymentMethod === EPaymentMethod.SuppressCheque &&
        isDefaultPaymentMethod === EBoolean.YesLetter,
    }),
    [isDefaultPaymentMethod, paymentMethod]
  );

  return { disabledConfig };
};
