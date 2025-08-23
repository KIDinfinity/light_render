import { formatMessageApi } from '@/utils/dictFormatMessage';
import moment from 'moment';
export const VLD_000994 = () => (rule: any, value: any, callback: Function) => {
  let year, month;
  if (moment(value).isValid()) {
    year = value.split('-')[0];
    month = value.split('-')[1];
  } else if (/^(0?[1-9]|1[0-2])\/\d{4}$/.test(value)) {
    year = value.split('/')[1];
    month = value.split('/')[0];
  }
  const currentDate = moment().format('YYYY-MM').split('-');
  if ((Number(year) - Number(currentDate[0])) * 12 + Number(month) - Number(currentDate[1]) <= 6) {
    callback(formatMessageApi({ Label_COM_ErrorMessage: 'MSG_001047' }));
  }
  callback();
};
