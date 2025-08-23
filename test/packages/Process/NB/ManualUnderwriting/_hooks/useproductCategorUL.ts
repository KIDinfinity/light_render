import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default () => {
  const productCategory =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) =>
        modelnamepsace.businessData.policyList[0]?.coverageList?.[0]?.productCategory,
      shallowEqual
    ) || [];

  return useMemo(() => {
    return productCategory === 'UL';
  }, [productCategory]);
};
