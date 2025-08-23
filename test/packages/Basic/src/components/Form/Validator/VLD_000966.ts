import { formatMessageApi } from '@/utils/dictFormatMessage';
import lodash from 'lodash';
export const VLD_000966 = (preDecision: any) => (rule: any, value: any, callback: Function) => {
  const phoneNoLength = lodash.size(value);
  if (!lodash.isEmpty(value) && phoneNoLength !== 11 && preDecision !== 'AP') {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_001009' }));
    return;
  }
  callback();
};
