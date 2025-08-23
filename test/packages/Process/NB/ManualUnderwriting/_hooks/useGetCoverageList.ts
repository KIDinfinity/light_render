import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default () => {
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.businessData,
    shallowEqual
  );

  return useMemo(() => {
    return (
      lodash
        .chain(businessData)
        .get('policyList[0].coverageList', [])
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
        .value() || []
    );
  }, [businessData]);
};
