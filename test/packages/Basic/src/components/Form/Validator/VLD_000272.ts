import lodash from 'lodash';
import moment from 'moment';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000272 = (dateOfAdmission: any, dateOfDischarge: any) => (
  rule: any,
  value: any,
  callback: Function
) => {
  if (!dateOfAdmission || !dateOfDischarge) return callback();
  let milliseconds = Number(moment(dateOfDischarge).diff(moment(dateOfAdmission)));
  milliseconds = milliseconds > 0 ? milliseconds : 0;
  const constant = 3600000;
  const days: number =
    Math.floor(milliseconds / constant / 24) + ((milliseconds / constant) % 24 > 6 ? 1 : 0);
  if (lodash.isNumber(value) && value > days) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000253' }));
  }
  callback();
};
