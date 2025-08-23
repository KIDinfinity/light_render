import { formatMessageApi } from '@/utils/dictFormatMessage';
import lodash from 'lodash';

export const VLD_001015 = (list, field) => (rule: any, value: any, callback: Function) => {
  if (!lodash.map(list, (item) => item.dictCode).includes(value)) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000420' }, field));
  }
  callback();
};
