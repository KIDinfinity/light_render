import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000637 = (unitHold: any) => (rule: any, value: any, callback: Function) => {
  if (Number(unitHold) !== 0 && Number(value) > Number(unitHold)) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000566' }));
  }

  callback();
};
