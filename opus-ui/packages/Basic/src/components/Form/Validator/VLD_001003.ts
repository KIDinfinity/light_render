import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_001003 = (data) => (rule: any, value: any, callback: Function) => {
  if (Number(value)>Number(data)) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000584' }));
  }
  callback();
};
