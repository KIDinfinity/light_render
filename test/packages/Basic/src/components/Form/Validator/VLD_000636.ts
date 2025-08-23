import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000636 = (unitHold: any) => (rule: any, value: any, callback: Function) => {
  if (Number(unitHold) === 0 && Number(value) > 0) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000564' }));
  }
  callback();
};
