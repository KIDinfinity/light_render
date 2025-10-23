import { formatMessageApi } from '@/utils/dictFormatMessage';
import moment from 'moment';

export const VLD_001110 = (targetDate: any) => (rule: any, value: any, callback: any) => {
  if (
    !targetDate ||
    moment(targetDate).startOf('day').valueOf() > moment(value).startOf('day').valueOf()
  ) {
    callback(formatMessageApi({ Label_COM_ErrorMessage: 'MSG_001256' }));
  }

  callback();
};
