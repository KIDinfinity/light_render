import useGetLoadingFieldVisibleByParams from 'decision/_hooks/useGetLoadingFieldVisibleByParams';

export default ({ coverageId, fieldConfig }: any) => {
  return useGetLoadingFieldVisibleByParams({
    coverageId,
    fieldConfig,
    key: 'meAllowIndicator',
    value: 'N',
  });
};
