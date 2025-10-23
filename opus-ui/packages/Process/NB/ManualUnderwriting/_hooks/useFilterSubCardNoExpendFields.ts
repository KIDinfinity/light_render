import { useMemo } from 'react';
import lodash from 'lodash';

const subCardNoExpendFieldId = ['dateOfBirth', 'gender'];

export default ({ data }: any) => {
  return useMemo(() => {
    return lodash
      .chain(data)
      .map((item) => {
        return {
          ...item,
          expand: lodash.includes(subCardNoExpendFieldId, item.key) ? 'Y' : 'N',
        };
      })
      .value();
  }, [data]);
};
