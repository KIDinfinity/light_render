import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_001098 = () => (rule: any, value: any, callback: any) => {
  if (Array.isArray(value) && value.length > 10) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_001230' }));
  }
  callback();
};
