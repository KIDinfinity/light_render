import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000230 = (payableAmount: number) => (
  rule: any,
  value: any,
  callback: Function
) => {
  if (payableAmount > value) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000216' }));
  }
  callback();
};
