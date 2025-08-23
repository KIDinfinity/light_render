import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000902 = () => (rule: any, value: any, callback: Function) => {
  if (value && !Number.isInteger(Number(value))) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000813' }));
  }
  callback();
};
