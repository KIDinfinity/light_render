import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000995 = (cardType) => (rule: any, value: any, callback: Function) => {
  if (/VISA/i.test(cardType) && !/^4/.test(value)) {
    callback(formatMessageApi({ Label_COM_ErrorMessage: 'MSG_001048' }));
  }
  if (/MAST/i.test(cardType) && !/^5/.test(value)) {
    callback(formatMessageApi({ Label_COM_ErrorMessage: 'MSG_001048' }));
  }
  if (/JCB/i.test(cardType) && !/^3/.test(value)) {
    callback(formatMessageApi({ Label_COM_ErrorMessage: 'MSG_001048' }));
  }
  callback();
};
