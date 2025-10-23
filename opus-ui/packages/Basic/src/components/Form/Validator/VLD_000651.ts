import { formatMessageApi } from '@/utils/dictFormatMessage';
import moment from 'moment';

export const VLD_000651 = (hkabRate: any) => (rule: any, value: any, callback: Function) => {

  if (hkabRate && !moment().isSame(value, 'day')) {
    callback(formatMessageApi({ Label_COM_Message: 'MSG_000586' }));
    return;
  }

  callback();
};
