import moment from 'moment';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000274 = (targetTime: any) => (rule: any, value: any, callback: Function) => {
  const valueFormat = moment(value).format();
  const targetTimeFormat = moment(targetTime).format();
  if (value && targetTime && moment(valueFormat).isAfter(moment(targetTimeFormat), 'day')) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000256' }));
  }
  callback();
};
