import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000945 = () => (rule: any, value: any, callback: Function) => {
  if (value !== 'Paid') {
    callback(formatMessageApi({ Label_COM_ErrorMessage: ' MSG_000962' }));
  }
  callback();
};
