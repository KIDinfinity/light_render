import lodash from 'lodash';
import moment from 'moment';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { fnPrecisionFormat, fnPrecisionParser } from '@/utils/precisionUtils';

export const getFormat = (fieldName: string, dictTypeCode: any) => {
  return formatMessageApi({ [dictTypeCode]: fieldName }) || fieldName;
};

const tableRenderFn = (type: string, text: any, dictTypeCode: any): string => {
  switch (type) {
    case 'Number':
      if (lodash.isNumber(text)) {
        return fnPrecisionFormat(fnPrecisionParser(parseFloat(text).toFixed(2)));
      }
      return text;
    case 'Date':
      return !lodash.isNil(text) ? moment(text).format('L') : null;
    case 'Dropdown':
      return getFormat(text, dictTypeCode);
    default:
      return text;
  }
};

export default tableRenderFn;
