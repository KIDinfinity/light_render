import { formatMessageApi } from '@/utils/dictFormatMessage';
import lodash from 'lodash';

export const VLD_000817 = () => (rule: any, value: any, callback: Function) => {
  if ((!lodash.isEmpty(value) && Number(value) < 10) || Number(value) > 40) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000817' }));
  }
  callback();
};
