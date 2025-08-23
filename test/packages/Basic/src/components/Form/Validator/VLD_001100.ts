import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_001100 = (isAllDecline) => (rule: any, value: any, callback: Function) => {
  if (isAllDecline && value === 'Y') {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_001233' }));
  } else {
    callback();
  }
};
