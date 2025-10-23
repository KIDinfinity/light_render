import { EBoolean, EPaymentMethod } from 'basic/enum';

interface useHookParams {
  form: any;
}
export default ({ form }: useHookParams) => {
  const isDefaultPaymentMethod = form.getFieldValue('isDefaultPaymentMethod');
  const paymentMethod = form.getFieldValue('paymentMethod');

  const disabledConfig = {
    paymentMethod: isDefaultPaymentMethod === EBoolean.YesLetter,
    subPaymentMethod:
      paymentMethod === EPaymentMethod.SuppressCheque &&
      isDefaultPaymentMethod === EBoolean.YesLetter,
    email:
      isDefaultPaymentMethod === EBoolean.YesLetter &&
      (paymentMethod === EPaymentMethod.ElevenCash ||
        paymentMethod === EPaymentMethod.FasterPayment),
    phoneNo:
      isDefaultPaymentMethod === EBoolean.YesLetter &&
      (paymentMethod === EPaymentMethod.ElevenCash ||
        paymentMethod === EPaymentMethod.FasterPayment),
    contactType:
      isDefaultPaymentMethod === EBoolean.YesLetter &&
      paymentMethod === EPaymentMethod.FasterPayment,
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
  };

  return { disabledConfig };
};
