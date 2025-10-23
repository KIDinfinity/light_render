import { formatMessageApi } from '@/utils/dictFormatMessage';
import lodash from 'lodash';

export const VLD_000800 =  (rule: any, value: any, callback: Function) => {
  if (lodash.size(value) > 50) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000003' }, 50));
  }
  callback();
}
