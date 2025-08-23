import { formatMessageApi } from '@/utils/dictFormatMessage';
import { isEqual } from 'lodash';

export default ({ labelId, type = 'label', defaultName }) => {
  const formatName = formatMessageApi({ [type]: labelId });

  return isEqual(formatName, labelId) ? defaultName || labelId : formatName;
};
