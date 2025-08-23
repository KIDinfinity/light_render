import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_001001 = (field) => (rule: any, value: any, callback: Function) => {
  if (value && !Number.isInteger(Number(value))) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000812' }, field));
  }
  callback();
};
