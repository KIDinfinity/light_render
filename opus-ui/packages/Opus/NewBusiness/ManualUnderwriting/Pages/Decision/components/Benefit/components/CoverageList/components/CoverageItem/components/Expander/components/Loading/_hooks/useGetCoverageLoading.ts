import { useGetCoverageList } from 'opus/NewBusiness/ManualUnderwriting/_hooks';
import { useMemo } from 'react';

export default ({ coverageId, loadingId }: { coverageId: string; loadingId: string }) => {
  const coverageList = useGetCoverageList();

  return useMemo(
    () =>
      coverageList
        .find((coverage) => coverage.id === coverageId)
        ?.coverageLoadingList?.find((loadingItem: { id: string }) => loadingItem.id === loadingId),
    [coverageId, coverageList, loadingId]
  );
};
