import lodash from 'lodash';
import useGetCoverageList from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetCoverageList';
import { useMemo } from 'react';

export default (coverageId: string, loadingId: string) => {
  const coverageList = useGetCoverageList();

  return useMemo(() => {
    return lodash
      .chain(coverageList || [])
      .find((listItem) => listItem.id === coverageId)
      .get('coverageLoadingList')
      .find((loadingItem) => loadingItem.id === loadingId)
      .value();
  }, [coverageId, loadingId, coverageList]);
};
