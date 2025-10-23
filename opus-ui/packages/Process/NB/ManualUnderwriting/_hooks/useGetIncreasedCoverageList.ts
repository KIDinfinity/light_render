import { useMemo } from 'react';
import lodash from 'lodash';
import useGetSustainabilityCheckingSelectedResult from 'process/NB/ManualUnderwriting/_hooks/useGetSustainabilityCheckingSelectedResult';

export default () => {
  const selectedData = useGetSustainabilityCheckingSelectedResult();
  return useMemo(() => {
    const coverageList =
      lodash
        .chain(selectedData)
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
        .value() || [];
    return coverageList;
  }, [selectedData]);
};
