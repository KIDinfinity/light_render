import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000901 = () => (rule: any, value: any, callback: Function) => {
  if (Number(value) > 100) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000557' }));
  }
  callback();
};
