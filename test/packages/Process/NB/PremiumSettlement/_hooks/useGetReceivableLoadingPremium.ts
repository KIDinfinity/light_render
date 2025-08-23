import { useMemo } from 'react';
import lodash from 'lodash';

export default ({ premiumBreakdownList }: any) => {
  return useMemo(() => {
    let receivableLoadingPremium = 0;
    lodash.forEach(premiumBreakdownList, (item: any) => {
      receivableLoadingPremium = lodash
        .chain(item?.loadingPremium || 0)
        .toNumber()
        .add(receivableLoadingPremium)
        .round(2)
        .value();
    });
    return receivableLoadingPremium;
  }, [premiumBreakdownList]);
};
