import { formatMessageApi } from '@/utils/dictFormatMessage';
import lodash from 'lodash';

export const VLD_000962 = () => (rule: any, value: any, callback: Function) => {
  const phoneNoLength = lodash.size(value);

  if (!lodash.isEmpty(value) && (phoneNoLength !== 10 || value?.[0] !== `0`)) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_001005' }));
    return;
  }
  callback();
};
