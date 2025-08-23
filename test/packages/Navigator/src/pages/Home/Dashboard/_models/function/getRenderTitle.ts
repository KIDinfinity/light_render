import moment from 'moment';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { chain } from 'lodash';
import DateFormat from 'navigator/pages/ReportCenter/Enum/DateFormat';

const getDate = ({ value, format}: any) =>  moment(value).format(DateFormat[format] || 'L')

export default (format: string, label: string, xMiscType: string) => {
  if (!!format && !!DateFormat[format]) {
    if (label.includes(',')) {
      return chain(label)
        .split(',')
        .map((value) => getDate({ value, format}))
        .join(',')
        .value();
    }
    if (moment(label).isValid()) {
      return getDate({ value: label, format});
    }
    return formatMessageApi({ [xMiscType]: label });
  }
  return formatMessageApi({ [xMiscType]: label });
};
