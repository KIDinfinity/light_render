import moment from 'moment';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000846 = (effectiveDate: string) => (
  rule: any,
  value: any,
  callback: Function
) => {
  if (!effectiveDate || !moment(value).isValid() || !moment(effectiveDate).isValid()) {
    callback();
    return;
  }

  const currentDate = moment(value).format('YYYY-MM-DD');
  const targetDate = moment(effectiveDate).format('YYYY-MM-DD');
  const targetDateAfterYear = moment(effectiveDate).add(1, 'year').format('YYYY-MM-DD');

  if (moment(currentDate).isBetween(targetDate, targetDateAfterYear, undefined, '[]')) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000855' }));
    return;
  }

  callback();
};
