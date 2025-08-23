import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000843 = (max: number) => (rule: any, value: any, callback: Function) => {
  if (value > max) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000852' }, max));
    return;
  }
  callback();
};
