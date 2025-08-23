import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000911 = () => (rule: any, value: any, callback: Function) => {
  if (value && Number(value) > 100) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000557' }));
  }
  callback();
};
