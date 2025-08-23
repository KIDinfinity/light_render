import moment from 'moment';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { fnPrecisionFormat, fnPrecisionParser } from '@/utils/precisionUtils';

export default (fieldConfig, data) => {
  const fieldType = fieldConfig.fieldType;
  const filed = fieldConfig.field;
  const originValue = data[filed];
  if (fieldType === 'Text') {
    return originValue;
  }
  if (fieldType === 'Date') {
    if (originValue) {
      return moment(originValue).format('L');
    }
    return null;
  }
  if (fieldType === 'Dropdown') {
    return formatMessageApi({
      [fieldConfig.dictTypeCode]: originValue,
    });
  }
  if (fieldType === 'Number') {
    // @ts-ignore
    return fnPrecisionFormat(fnPrecisionParser(parseFloat(originValue).toFixed(2)));
  }
  return originValue;
};
