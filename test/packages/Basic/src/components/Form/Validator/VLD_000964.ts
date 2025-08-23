import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000964 = (preDecision: any) => (rule: any, value: any, callback: Function) => {
  if (/.+\s.+/gi.test(`${value}`) && preDecision !== 'AP') {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_001007' }));
    return;
  }
  callback();
};
