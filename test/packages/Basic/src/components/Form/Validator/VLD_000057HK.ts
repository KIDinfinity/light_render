import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000057HK = (icuFromDateValue: any) => (
  rule: any,
  value: any,
  callback: Function
) => {
  if (value < icuFromDateValue) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000082' }));
  }
  callback();
};
