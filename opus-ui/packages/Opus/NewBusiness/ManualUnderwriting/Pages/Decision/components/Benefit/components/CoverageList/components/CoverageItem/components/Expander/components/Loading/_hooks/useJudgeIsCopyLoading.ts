import useGetCoverageLoading from './useGetCoverageLoading';

export default ({ loadingId, coverageId }: { loadingId: string; coverageId: string }) => {
  const loading = useGetCoverageLoading({ loadingId, coverageId });

  return !!loading?.copyId;
};
