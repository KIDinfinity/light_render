import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000631 = (length: any) => (rule: any, value: any, callback: Function) => {
  if (length === 0) {
    callback(formatMessageApi({ Label_COM_Message: 'MSG_000556' }));
    return;
  }
  callback();
};
