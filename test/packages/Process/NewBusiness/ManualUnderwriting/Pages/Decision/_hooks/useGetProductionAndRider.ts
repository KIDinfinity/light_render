import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export default () => {
  const planProductConfig = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.planProductConfig,
    shallowEqual
  );
  return useMemo(() => {
    return lodash.concat(
      lodash.get(planProductConfig, 'basicPlanProductFeatureList', []),
      lodash.get(planProductConfig, 'otherPlanProductFeatureList')
    );
  }, [planProductConfig]);
};
