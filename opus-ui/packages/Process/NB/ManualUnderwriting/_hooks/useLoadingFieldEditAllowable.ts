import useLoadingAllowableConditions from 'process/NB/ManualUnderwriting/_hooks/useLoadingAllowableConditions';
import { chain } from 'lodash';
import useGetCoverageList from 'process/NB/ManualUnderwriting/_hooks/useGetCoverageList';
import { formUtils } from 'basic/components/Form';

export default (coverageId, loadingId, indicator, value) => {
  const coverageList = useGetCoverageList();

  const loading = chain(coverageList || [])
    .find((listItem) => listItem.id === coverageId)
    .get('coverageLoadingList')
    .find((loadingItem) => loadingItem.id === loadingId)
    .value();

  return useLoadingAllowableConditions(formUtils.queryValue(loading?.code), indicator, value);
};
