import useGetLoadingFieldVisibleByParams from 'process/NB/ManualUnderwriting/_hooks/useGetLoadingFieldVisibleByParams';

export default ({ coverageId, fieldConfig }: any) => {
  return useGetLoadingFieldVisibleByParams({
    coverageId,
    fieldConfig,
    key: 'feAllowIndicator',
    value: 'N',
  });
};
