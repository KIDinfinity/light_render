import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_001099 = (claimWithOther) => (rule: any, value: any, callback: Function) => {
  if (claimWithOther && value === 'Y') {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_001232' }));
  }
  callback();
};
