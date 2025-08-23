import { useMemo } from 'react';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import type { planProductConfig } from '../types';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import useGetCoverageProductList from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetCoverageProductList';
import getRelatedRider from 'process/NewBusiness/ManualUnderwriting/_utils/getRelatedRider';

export default () => {
  const productCodes = useGetCoverageProductList();
  const planProductConfig: planProductConfig = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.planProductConfig,
    shallowEqual
  );
  return useMemo(() => {
    return getRelatedRider({ productCodes, planProductConfig });
  }, [productCodes, planProductConfig]);
};
