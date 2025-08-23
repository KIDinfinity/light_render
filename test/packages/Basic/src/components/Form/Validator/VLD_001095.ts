import { formatMessageApi } from '@/utils/dictFormatMessage';
import lodash from 'lodash';
export const VLD_001095 = (min) => (rule: any, value: any, callback: Function) => {
  if (lodash.isNumber(min) && value <= min) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_001221' }, min));
  }
  callback();
};
