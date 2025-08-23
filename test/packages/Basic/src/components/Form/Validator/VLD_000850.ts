import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000850 = (min: number, max: number) => (
  rule: any,
  value: any,
  callback: Function
) => {
  if (value > max || value < min) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000859' }, min, max));
    return;
  }
  callback();
};
