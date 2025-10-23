import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000964 = () => (rule: any, value: any, callback: Function) => {
  if (/.+\s.+/gi.test(`${value}`)) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_001007' }));
    return;
  }
  callback();
};
