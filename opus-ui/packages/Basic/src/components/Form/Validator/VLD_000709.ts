import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000709 = () => (
  rule: any,
  value: any,
  callback: Function
) => {
  if (value % 10) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000663' }));
  }
  callback();
};
