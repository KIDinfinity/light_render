import { formatMessageApi } from '@/utils/dictFormatMessage';
import moment from 'moment';
export const VLD_000994 = () => (rule: any, value: any, callback: Function) => {
  const year = value.split('-')[0];
  const month = value.split('-')[1];
  const currentDate = moment().format('YYYY-MM').split('-');

  if ((Number(year) - Number(currentDate[0])) * 12 + Number(month) - Number(currentDate[1]) <= 6) {
    callback(formatMessageApi({ Label_COM_ErrorMessage: 'MSG_001047' }));
  }
  callback();
};
