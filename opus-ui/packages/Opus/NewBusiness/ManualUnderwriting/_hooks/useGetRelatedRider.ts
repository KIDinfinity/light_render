import { useMemo } from 'react';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import useGetCoverageProductList from 'opus/NewBusiness/ManualUnderwriting/_hooks/useGetCoverageProductList';
import getRelatedRider from 'opus/NewBusiness/ManualUnderwriting/_utils/getRelatedRider';

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
