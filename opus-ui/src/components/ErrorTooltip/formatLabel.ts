import memoizeOne from 'memoize-one';
import lodash from 'lodash';
import { initialCapital } from '@/utils/utils';
import { formatMessageApi } from '@/utils/dictFormatMessage';

const getFormat = (labelId = '', labelTypeCode: any) => {
  const { dictionary } = window as any;
  if (lodash.get(dictionary, `${labelTypeCode}.${labelId}`)) {
    return { [labelTypeCode]: labelId };
  } else {
    const typeCode =
      lodash.findKey(dictionary, (value: any) => lodash.has(value, labelId)) || labelTypeCode;
    return { [typeCode]: labelId };
  }
};

const formatLabel = memoizeOne((labelId, labelTypeCode, ignoreLabelUpper) => {
  if (ignoreLabelUpper) {
    return formatMessageApi(getFormat(labelId, labelTypeCode));
  }
  return initialCapital(formatMessageApi(getFormat(labelId, labelTypeCode)));
});

export default formatLabel;
