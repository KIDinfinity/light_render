import { formatMessageApi } from '@/utils/dictFormatMessage';
import lodash from 'lodash';

export const VLD_000972 = () => (rule: any, value: any, callback: Function) => {
  const addressLength = lodash.size(value);
  if (addressLength > 30) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_001011' }));
    return;
  }
  callback();
};
