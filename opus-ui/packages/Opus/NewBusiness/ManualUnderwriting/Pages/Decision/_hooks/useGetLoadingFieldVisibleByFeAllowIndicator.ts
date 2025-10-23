import useGetLoadingFieldVisibleByParams from './useGetLoadingFieldVisibleByParams';

export default ({ coverageId, fieldConfig }: any) => {
  return useGetLoadingFieldVisibleByParams({
    coverageId,
    fieldConfig,
    key: 'feAllowIndicator',
    value: 'N',
  });
};
