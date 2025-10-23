import { useMemo } from 'react';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default (totalFundInfoList: any) => {

  const total = useMemo(() => {
    return lodash.reduce(
      totalFundInfoList,
      (sum: number, n) => {
        const fundAllocation = lodash.toNumber(
          formUtils.queryValue(lodash.get(n, 'fundAllocation'))
        );
        if (!lodash.isNaN(fundAllocation)) {
          return sum + fundAllocation;
        }
        return sum;
      },
      0
    );
  }, [totalFundInfoList]);
  return total;
};
