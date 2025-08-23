import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import React from 'react';
import useGetCoverageList from 'process/NB/ManualUnderwriting/_hooks/useGetCoverageList';
import { formUtils } from 'basic/components/Form';

export default () => {
  const coverageList = useGetCoverageList();
  const planProductConfig = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.planProductConfig,
    shallowEqual
  );
  return React.useMemo(() => {
    if (!planProductConfig) return false;
    let mergedProductList = [
      ...planProductConfig?.basicPlanProductFeatureList,
      ...planProductConfig?.otherPlanProductFeatureList,
    ];

    mergedProductList = lodash.filter(
      mergedProductList,
      (plan: any) =>
        lodash.findIndex(
          coverageList,
          (value: any) => formUtils.queryValue(value?.coreCode) === plan?.productCode
        ) > -1
    );
    return lodash.some(mergedProductList, (product: any) => product?.waiveCode === 'MW');
  }, [planProductConfig, coverageList]);
};
