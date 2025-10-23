import { useMemo } from 'react';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import useGetCoverageList from 'process/NB/ManualUnderwriting/_hooks/useGetCoverageList';

export default () => {
  const coverageList = useGetCoverageList();
  return useMemo(() => {
    let haveGreaterDurationLife = false;
    const waiveTermSet = new Set();
    lodash
      .chain(coverageList)
      .filter((coverage) => !lodash.isEmpty(coverage.coverageLoadingList))
      .forEach((coverage) => {
        lodash.forEach(coverage.coverageLoadingList, (loadingItem) => {
          waiveTermSet.add(formUtils.queryValue(loadingItem.waiveTerm));
          if (
            formUtils.queryValue(loadingItem.waiveTerm) > formUtils.queryValue(loadingItem.fmPeriod)
          ) {
            haveGreaterDurationLife = true;
          }
        });
      })
      .value();
    return waiveTermSet.has(0) || haveGreaterDurationLife;
  }, [coverageList]);
};
