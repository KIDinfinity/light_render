import memoizeOne from 'memoize-one';
import lodash from 'lodash';
import { initialCapital } from '@/utils/utils';
import { formatMessageApi } from '@/utils/dictFormatMessage';

const getFormat = (labelId = '', labelTypeCode: any) => {
  const { dictionary } = window as any;
  let typeCode = labelTypeCode;
  const format = {};
  if (lodash.get(dictionary, `${typeCode}.${labelId}`)) return { [typeCode]: labelId };
  lodash.forIn(dictionary, (value: any, key: any) => {
    if (lodash.has(value, labelId)) {
      typeCode = key;
    }
  });
  format[typeCode] = labelId;
  return format;
};

const formatLabel = memoizeOne((labelId, labelTypeCode) =>
  // @ts-ignore
  initialCapital(formatMessageApi(getFormat(labelId, labelTypeCode)))
);

export default formatLabel;
