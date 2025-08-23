import lodash from 'lodash';
import { useMemo } from 'react';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { formUtils } from 'basic/components/Form';
import useGetCoverageList from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetCoverageList';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import type Mode from 'process/NewBusiness/ManualUnderwriting/_enum/Mode';

export default (dataType?: Mode) => {
  const planProductConfig = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.planProductConfig,
    shallowEqual
  );

  const coverageList = useGetCoverageList(dataType);
  const originProductList = (() => {
    const {
      basicPlanProductFeatureList,
      otherPlanProductFeatureList,
    } = lodash.pick(planProductConfig, [
      'basicPlanProductFeatureList',
      'otherPlanProductFeatureList',
    ]);

    return lodash.unionBy(
      [...basicPlanProductFeatureList, ...otherPlanProductFeatureList],
      'productCode'
    );
  })();
  const currentProductList = lodash
    .chain(coverageList)
    .map((item) => formUtils.queryValue(item.coreCode))
    .value();
  return useMemo(() => {
    return lodash
      .chain(originProductList)
      .filter((item) => lodash.includes(currentProductList, item?.productCode))
      .find((item) => item?.premiumInUnitBasis === 'Y')
      .value();
  }, [originProductList, currentProductList]);
};
