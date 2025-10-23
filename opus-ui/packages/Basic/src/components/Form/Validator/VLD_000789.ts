import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000789 = () => (rule: any, value: any, callback: Function) => {
  if (value === 'OTHS') {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000779' }));
  }
  callback();
};
