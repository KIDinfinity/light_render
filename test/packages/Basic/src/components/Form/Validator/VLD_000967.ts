import { formatMessageApi } from '@/utils/dictFormatMessage';
import lodash from 'lodash';

export const VLD_000967 = () => (rule: any, value: any, callback: Function) => {
  const addressLength = lodash.size(value);
  if (addressLength === 1 || addressLength > 30) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_001010' }));
    return;
  }
  callback();
};
