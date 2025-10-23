import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000848 = (accountValue: any) => (rule: any, value: any, callback: Function) => {
  if (Number(accountValue) - Number(value) < 100) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000857' }));
  }
  callback();
};
