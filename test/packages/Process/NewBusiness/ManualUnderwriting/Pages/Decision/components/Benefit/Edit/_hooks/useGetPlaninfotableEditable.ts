import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import {tenant, Region} from '@/components/Tenant';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export default () => {
  const regionCode = tenant.region();
  const gsIndicator = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.processData?.planInfoData?.gsIndicator,
    shallowEqual
  );
  return useMemo(() => {
    return !(formUtils.queryValue(gsIndicator) === 'S' && regionCode === Region.VN);
  }, [gsIndicator, regionCode]);
};
