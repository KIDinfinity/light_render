import { useMemo } from 'react';
import lodash from 'lodash';
import useGetCoverageList from 'process/NB/ManualUnderwriting/_hooks/useGetCoverageList';

export default ({ coverageId, id }: any) => {
  const coverageList = useGetCoverageList();
  return useMemo(() => {
    return lodash
      .chain(coverageList)
      .find((item: any) => item?.id === coverageId)
      .get('coverageLoadingList', [])
      .find((item: any) => item?.id === id)
      .get('loadingFunctionType')
      .value();
  }, [coverageList, coverageId, id]);
};
