import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import useGetCoverageProductList from 'process/NB/ManualUnderwriting/_hooks/useGetCoverageProductList';
import getRelatedRider from 'process/NB/ManualUnderwriting/utils/getRelatedRider';

export default () => {
  const productCodes = useGetCoverageProductList();
  const planProductConfig = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.planProductConfig,
    shallowEqual
  );
  return useMemo(() => {
    return getRelatedRider({ productCodes, planProductConfig });
  }, [productCodes, planProductConfig]);
};
