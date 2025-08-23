import { useMemo } from 'react';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { tenant, Region } from '@/components/Tenant';

export default () => {
  if (tenant.region() !== Region.MY) {
    return false;
  }
  const uwApproach = useSelector(
    (state) => lodash.get(state, `${NAMESPACE}.processData.policyDecision.uwApproach`),
    shallowEqual
  );
  const gsIndicator = useSelector(
    (state) => lodash.get(state, `${NAMESPACE}.processData.planInfoData.gsIndicator`),
    shallowEqual
  );

  return useMemo(() => {
    if (!!uwApproach) {
      return uwApproach === 'FUW';
    } else {
      return gsIndicator === 'FUW' || !gsIndicator;
    }
  }, [uwApproach, gsIndicator]);
};
