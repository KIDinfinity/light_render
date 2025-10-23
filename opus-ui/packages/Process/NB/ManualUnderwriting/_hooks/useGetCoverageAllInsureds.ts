import { useMemo } from 'react';
import lodash from 'lodash';
import useGetCoverageList from 'process/NB/ManualUnderwriting/_hooks/useGetCoverageList';

export default () => {
  const coverageList = useGetCoverageList();
  return useMemo(() => {
    const IdSet = new Set();
    lodash
      .chain(coverageList)
      .forEach((coverage: any) => {
        lodash
          .chain(coverage)
          .get('coverageInsuredList', [])
          .forEach((insuredItem: any) => {
            IdSet.add(insuredItem?.clientId);
          })
          .value();
      })
      .value();

    return Array.from(IdSet);
  }, [, coverageList]);
};
