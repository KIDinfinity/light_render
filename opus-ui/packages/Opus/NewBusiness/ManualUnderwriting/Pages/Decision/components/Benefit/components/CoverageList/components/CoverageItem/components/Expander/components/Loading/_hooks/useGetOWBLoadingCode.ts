import { useMemo } from 'react';
import useGetCoverageLoading from './useGetCoverageLoading';
import { getOWBLoadingCode } from 'opus/NewBusiness/ManualUnderwriting/_utils';

export default ({ coverageId, loadingId }: { coverageId: string; loadingId: string }) => {
  const loading = useGetCoverageLoading({ loadingId, coverageId });

  return useMemo(() => getOWBLoadingCode(loading), [loading]);
};
