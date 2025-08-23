import { useMemo } from 'react';
import lodash from 'lodash';
import useGetCoverageList from 'process/NB/ManualUnderwriting/_hooks/useGetCoverageList';

export default () => {
  const coverageList = useGetCoverageList();
  return useMemo(() => {
    return lodash
      .chain(coverageList)
      .find((item: any) => item.isMain === 'Y')
      .value();
  }, [coverageList]);
};
