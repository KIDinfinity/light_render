import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_001108 = (maxLength: number) => (rule: any, value: any, callback: Function) => {
  if (`${value}`.split(';').length > maxLength) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_001253' }));
  }
  callback();
};
