import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000863 = (unitHold, accountValue: any) => (
  rule: any,
  value: any,
  callback: Function
) => {
  if (Number(unitHold) !== 0 && Number(value) > Number(accountValue)) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000876' }));
  }

  callback();
};
