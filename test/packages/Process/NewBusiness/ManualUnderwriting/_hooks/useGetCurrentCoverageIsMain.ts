import { useMemo } from 'react';
import lodash from 'lodash';
import useGetCoverageList from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetCoverageList';

export default ({ id }: any) => {
  const coverageList = useGetCoverageList('edit');
  return useMemo(() => {
    const currentCoverage = lodash
      .chain(coverageList)
      .find((item: any) => item?.id === id)
      .value();
    return lodash.get(currentCoverage, 'isMain');
  }, [coverageList, id]);
};
