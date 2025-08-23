import lodash from 'lodash';
import moment from 'moment';
import { fnPrecisionFormat, fnPrecisionParser } from '@/utils/precisionUtils';

const tableRenderFn = (type: string, text: any): string => {
  if (lodash.isUndefined(text) || lodash.isNull(text)) {
    return '-';
  }
  switch (type) {
    case 'number':
      if (lodash.isNumber(text)) {
        return fnPrecisionFormat(fnPrecisionParser(parseFloat(text).toFixed(2)));
      }
      return text;
    case 'date':
      return moment(text).format('L');
    default:
      return text;
  }
};

export default tableRenderFn;
