import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000604 = (premiumPaymentMethod) => (rule: any, value: any, callback: Function) => {
  if (premiumPaymentMethod === '5' && value === 'PREM') {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000524' }));
    return;
  }
  callback();
};
