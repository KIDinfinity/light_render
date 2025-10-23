import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000638 = (switchOut: any) => (rule: any, value: any, callback: Function) => {
  if (switchOut && Number(switchOut) !== 0 && Number(value || 0) > 0) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000568' }));
  }
  callback();
};
