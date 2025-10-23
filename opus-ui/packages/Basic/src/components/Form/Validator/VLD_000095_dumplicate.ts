import moment from 'moment';
import { formatMessageApi } from '@/utils/dictFormatMessage';

// （放射線治療温熱療法　期間）結束日須不早於開始日
export const VLD_000095_dumplicate = (startDate: any, endDate: any, callback: Function) => {
  if (moment(endDate).startOf('day').valueOf() < moment(startDate).startOf('day').valueOf()) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000110' }));
  }
  callback();
};
