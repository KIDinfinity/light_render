import { formUtils } from 'basic/components/Form';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import useGetCoverageList from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetCoverageList';
import React from 'react';

export default (type?: string) => {
  const coverageList = useGetCoverageList(type);
  const planProductConfig = useSelector(
    ({ [NAMESPACE]: modelNamespace }: any) => modelNamespace.planProductConfig,
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
