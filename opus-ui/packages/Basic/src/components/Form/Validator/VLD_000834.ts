import { formatMessageApi } from '@/utils/dictFormatMessage';
import moment from 'moment';

export const VLD_000834 = (sourceSystem: string) => (rule: any, value: any, callback: Function) => {
  if (sourceSystem === 'IL' && moment(value).isValid()) {
    if (moment(value).isBefore(moment(),'day')) {
      callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000836' }));
    }
  }
  callback();
};
