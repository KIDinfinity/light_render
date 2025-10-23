import lodash from 'lodash';
import { EPaymentMethod } from '../_dto/Enums';

export default ({ paymentMethod }: any) => {
  const arr = [
    EPaymentMethod.ElevenCash,
    EPaymentMethod.FasterPayment,
    EPaymentMethod.DirectCredit,
  ];

  return lodash.includes(arr, paymentMethod);
};
