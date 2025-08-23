import { useMemo } from 'react';
import { useSelector } from 'dva';
import { tenant, Region } from '@/components/Tenant';

import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export default () => {
  const policyFirstAddress = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.modalData.processData.planInfoData
  );

  const countryCode = formUtils.queryValue(policyFirstAddress?.PolicyAddress7);

  const result = useMemo(() => {
    const regionCode = tenant.region();
    if (
      (regionCode === Region.PH && countryCode === Region.RP) ||
      (regionCode === Region.VN && countryCode === Region.VNM) ||
      (regionCode === Region.KH && countryCode === Region.KHM) ||
      (regionCode === Region.MY && countryCode === Region.MYS) ||
      (regionCode === Region.ID && countryCode === Region.RI) ||
      (regionCode === Region.TH && countryCode === Region.TH)
    ) {
      return true;
    }
    return false;
  }, [countryCode]);
  return result;
};
