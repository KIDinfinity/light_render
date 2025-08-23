import { map, find } from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export default ({ dropdownOptions = [], fieldName }: any) => {
  const { values = [], miscType } = find(dropdownOptions, { fieldName }) || {};
  return (
    map(values, (key: any) => ({
      key,
      value: formatMessageApi({
        [miscType]: key,
      }),
    })) || []
  );
};
