import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000912 = () => (rule: any, value: any, callback: Function) => {
  if (value === 0) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000834' }));
  }
  callback();
};
