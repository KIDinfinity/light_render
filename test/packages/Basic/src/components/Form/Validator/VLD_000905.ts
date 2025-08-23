import { formatMessageApi } from '@/utils/dictFormatMessage';
import lodash from 'lodash';

export const VLD_000905 = (data) => (rule: any, value: any, callback: Function) => {
  const list = data?.fundAllocation?.fundAllocationFundList || [];

  if (lodash.isEmpty(list)) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000582' }));
  }
  callback();
};
