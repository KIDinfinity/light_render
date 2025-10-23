import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000246 = (limitItem: any) => (rule: any, value: any, callback: Function) => {
  if (limitItem && !lodash.isNumber(value)) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000230' }));
  }
  callback();
};
