import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000848 =
  (accountValue: any, limitData: any) => (rule: any, value: any, callback: Function) => {
    if (Number(accountValue) - Number(value) < Number(limitData?.limitAmount)) {
      callback(
        formatMessageApi({ Label_COM_WarningMessage: 'MSG_000857' }, limitData?.limitAmount)
      );
    }
    callback();
  };
