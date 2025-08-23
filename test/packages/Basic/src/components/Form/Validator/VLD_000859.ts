import { formatMessageApi } from '@/utils/dictFormatMessage';
import moment from 'moment';

export const VLD_000859 = (sourceSystem) => (rule: any, value: any, callback: Function) => {
  if (sourceSystem === 'IL' && moment(value).isValid()) {
    if (moment(value).isAfter(moment(), 'day')) {
      callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000874' }));
    }
  }
  callback();
};
