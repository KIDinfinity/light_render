import { formatMessageApi } from '@/utils/dictFormatMessage';
export const VLD_001123 = () => (rule: any, value: any, callback: Function) => {
  if (value === 'N') {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_001275' }));
  }
  callback();
};
