import { formatMessageApi } from '@/utils/dictFormatMessage';
import getTextWidth from './getTextWidth';

/**
 * right - circle
 * left - square
 */
export default ({ legendProps, props }: any) => {
  const { value, symbol } = legendProps;
  const { lineSeriesField, miscType, columnField, yField } = props;
  let fieldName = '';

  if (symbol === 'circle') {
    fieldName = lineSeriesField || yField[1];
  }
  if (symbol === 'square') {
    fieldName = columnField || yField[0];
  }

  const lineTypeCode = miscType?.[fieldName];

  return getTextWidth({
    value: lineTypeCode ? formatMessageApi({ [lineTypeCode]: value }) : value,
    maxTextWidth: 80,
  });
};
