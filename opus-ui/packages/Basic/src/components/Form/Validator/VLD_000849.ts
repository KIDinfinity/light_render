import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000849 = (unitHold, accountValue: any, limitData: any) => (
  rule: any,
  value: any,
  callback: Function
) => {
  if (
    Number(unitHold) !== 0 &&
    Number(accountValue) - Number(value) < Number(limitData?.limitAmount) &&
    Number(value || 0) !== 0
  ) {
    callback(
      formatMessageApi(
        { Label_COM_WarningMessage: 'MSG_000858' },
        `${limitData?.currency}${limitData?.limitAmount}`
      )
    );
  }
  callback();
};
