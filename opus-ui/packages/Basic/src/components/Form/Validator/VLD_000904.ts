import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000904 = (data, listLength) => (rule: any, value: any, callback: Function) => {
  const list = data?.fundAllocation?.fundAllocationFundList || [];
  if (list.length > listLength) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000583' }, listLength));
  }
  callback();
};
