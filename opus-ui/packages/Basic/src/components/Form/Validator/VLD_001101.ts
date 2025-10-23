import { isString } from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_001101 = () => (rule: any, value: any, callback: any) => {
  if (isString(value) && value.length > 100) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_001234' }));
  }
  callback();
};
