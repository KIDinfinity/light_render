import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import React from 'react';

export default ({ coreCode }: any) => {
  const planProductConfig = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.planProductConfig,
    shallowEqual
  );
  return React.useMemo(() => {
    if (!planProductConfig) return false;
    const record = lodash
      .chain([
        ...planProductConfig?.basicPlanProductFeatureList,
        ...planProductConfig?.otherPlanProductFeatureList,
      ])
      .find((item: any) => item.productCode === coreCode)
      .get('waiveCode')
      .isEqual('MW')
      .value();

    return !record;
  }, [planProductConfig, coreCode]);
};
