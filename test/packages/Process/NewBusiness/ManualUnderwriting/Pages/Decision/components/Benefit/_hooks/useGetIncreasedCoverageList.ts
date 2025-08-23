import { useMemo } from 'react';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export default () => {
  const selectedData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace?.sustainabilityModal?.converageListApplied,
    shallowEqual
  );

  return useMemo(() => {
    const coverageList =
      lodash
        .chain(selectedData)
        .map((coverage: any) => {
          return {
            ...coverage,
            isMainWeight: coverage.isMain === 'Y' ? 1 : 0,
          };
        })
        .orderBy(['isMainWeight', 'lifeNo'], ['desc', 'asc'])
        .map((coverage: any) => {
          const { isMainWeight, ...others } = coverage;
          return others;
        })
        .value() || [];
    return coverageList;
  }, [selectedData]);
};
