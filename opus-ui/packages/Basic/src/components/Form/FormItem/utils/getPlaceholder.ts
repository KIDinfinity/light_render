import { isString, isNil } from 'lodash';
import { formatLabel } from '@/components/ErrorTooltip';

const getPlaceholder = ({ placeholder, isInline, labelId, labelTypeCode }: any) => {
  const newPlaceholder =
    isInline && isNil(placeholder) ? formatLabel(labelId, labelTypeCode) : placeholder;

  return isString(newPlaceholder) ? newPlaceholder : '';
};

export default getPlaceholder;
