import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000903 = () => (rule: any, value: any, callback: Function) => {
  if (Number(value) !== 100) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000559' }));
  }
  callback();
};
