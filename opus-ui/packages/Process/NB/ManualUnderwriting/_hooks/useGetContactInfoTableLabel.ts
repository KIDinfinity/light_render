import { useMemo } from 'react';
import lodash from 'lodash';

export default ({ data }: any) => {
  return useMemo(() => {
    const tableLabel = lodash
      .chain(data)
      .filter((item: any) => item.key !== 'countryCode' && item.key !== 'areaCode')
      .map((item): any => item.label)
      .value();
    return tableLabel;
  }, [data]);
};
