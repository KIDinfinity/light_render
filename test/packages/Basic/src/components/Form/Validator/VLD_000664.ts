import lodash from 'lodash';
import { EPaymentMethod, EContactType } from 'basic/enum';
import { formatMessageApi } from '@/utils/dictFormatMessage';

interface IProps {
  paymentMethodVal: string;
  contactTypeVal: string;
}
export const VLD_000664 = ({ paymentMethodVal, contactTypeVal }: IProps) => (
  rule: any,
  value: any,
  callback: Function
) => {
  if (
    paymentMethodVal !== EPaymentMethod.FasterPayment ||
    contactTypeVal !== EContactType.MobilePhone ||
    !value
  ) {
    callback();
    return;
  }

  const valueArr = value.split('-');
  const regExp = /\D/;

  if (
    valueArr.length !== 2 ||
    lodash.size(valueArr?.[0]) < 1 ||
    lodash.size(valueArr?.[0]) > 3 ||
    lodash.size(valueArr?.[1]) < 1 ||
    lodash.size(valueArr?.[1]) > 26 ||
    lodash.some(valueArr, (item) => regExp.test(item))
  ) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000603' }));
    return;
  }

  callback();
};
