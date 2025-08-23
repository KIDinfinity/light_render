import { useMemo } from 'react';
import { tenant, Region } from '@/components/Tenant';

export default ({ currentCountry }: any) => {
  const regionCode = tenant.region();
  const result = useMemo(() => {
    if (
      (regionCode === Region.PH && currentCountry === Region.RP) ||
      (regionCode === Region.VN && currentCountry === Region.VNM) ||
      (regionCode === Region.KH && currentCountry === Region.KHM) ||
      (regionCode === Region.MY && currentCountry === Region.MYS) ||
      (regionCode === Region.ID && currentCountry === Region.RI) ||
      (regionCode === Region.TH && currentCountry === Region.TH)
    ) {
      return true;
    }
    return false;
  }, [regionCode, currentCountry]);
  return result;
};
