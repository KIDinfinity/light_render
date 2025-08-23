import { useMemo } from 'react';
import lodash from 'lodash';

export default ({ allCategroyData, tsarCalculationCategory }: any) => {
  return useMemo(() => {
    if (tsarCalculationCategory)
      return lodash
        .chain(allCategroyData)
        .filter((el: any) => el.tsarCalculationCategory !== tsarCalculationCategory)
        .value();
    return [];
  }, [tsarCalculationCategory, allCategroyData]);
};
