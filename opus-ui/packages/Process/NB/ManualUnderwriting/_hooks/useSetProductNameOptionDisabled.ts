import { useMemo } from 'react';
import lodash from 'lodash';
import useGetCoverageList from 'process/NB/ManualUnderwriting/_hooks/useGetCoverageList';

export default () => {
  const coverageList = useGetCoverageList();
  return useMemo(() => {
    return lodash.reduce(
      coverageList,
      (list, item) => {
        if (item.loadingRule?.addLoading === 'N') {
          return [...list, item.loadingRule?.productCode];
        }
        return list;
      },
      []
    );
  }, [coverageList]);
};
