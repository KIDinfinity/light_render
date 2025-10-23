import { formatMessageApi } from '@/utils/dictFormatMessage';
import lodash from 'lodash';

export const VLD_000963 = () => (rule: any, value: any, callback: Function) => {
  if (!lodash.isEmpty(value) && !(`${value?.[0]}` === `9` || `${value?.[0]}` === `0`)) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_001006' }));
    return;
  }
  callback();
};
