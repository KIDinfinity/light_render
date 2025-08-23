import { useMemo } from 'react';
import { useDispatch } from 'dva';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import useGetBasicProductData from 'process/NB/ManualUnderwriting/_hooks/useGetBasicProductData';
import useGetCfgLoadingMappingUIRule from 'process/NB/ManualUnderwriting/_hooks/useGetCfgLoadingMappingUIRule';
import useGetCurrentCoverageIsMain from 'process/NB/ManualUnderwriting/_hooks/useGetCurrentCoverageIsMain';
import CoverageType from 'process/NB/ManualUnderwriting/Enum/CoverageType';

export default ({ coverageId }: any) => {
  const isMain = useGetCurrentCoverageIsMain({ id: coverageId });
  const basicProductList = useGetBasicProductData();
  const dispatch = useDispatch();
  const addRidersLoading = useGetCfgLoadingMappingUIRule();
  const basicProductCoverageLoadingList = basicProductList?.coverageLoadingList;

  return useMemo(() => {
    if (
      !lodash.isEmpty(addRidersLoading) &&
      addRidersLoading === coverageId &&
      isMain === CoverageType.Rider
    ) {
      dispatch({
        type: `${NAMESPACE}/updateRidersLoading`,
        payload: {
          basicProductCoverageLoadingList,
          id: addRidersLoading,
        },
      });
    }
  }, [addRidersLoading, basicProductCoverageLoadingList, isMain]);
};
