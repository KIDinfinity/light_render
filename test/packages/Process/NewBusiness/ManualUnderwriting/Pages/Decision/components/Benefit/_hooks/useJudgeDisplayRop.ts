import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export default (coreCode?: string) => {
  const planProductConfig = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.planProductConfig,
    shallowEqual
  );

  const coverageList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.coverageList,
    shallowEqual
  );

  const productConfig = useMemo(() => {
    const {
      basicPlanProductFeatureList = [],
      otherPlanProductFeatureList = [],
      requiredProductCodeList = [],
    } = lodash.pick(planProductConfig, [
      'basicPlanProductFeatureList',
      'otherPlanProductFeatureList',
      'requiredProductCodeList',
    ]);

    return lodash.filter(
      [...basicPlanProductFeatureList, ...otherPlanProductFeatureList, ...requiredProductCodeList],
      (item) => item.ropInd === 'Y'
    );
  }, [planProductConfig]);

  const productList = useMemo(() => {
    return lodash.map(coverageList, (item) => formUtils.queryValue(item?.coreCode));
  }, [coverageList]);

  if (coreCode) {
    return lodash.some(productConfig, { productCode: coreCode, ropInd: 'Y' });
  } else {
    return lodash.some(productConfig, (item) => lodash.includes(productList, item.productCode));
  }
};
