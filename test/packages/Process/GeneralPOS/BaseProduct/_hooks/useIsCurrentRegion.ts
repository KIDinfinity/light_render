import { useMemo } from 'react';
import { tenant } from '@/components/Tenant';
import { formUtils } from 'basic/components/Form';

const CurrentRegionMap = {
  TH: 'TH',
};

export default ({ form }: any) => {
  const regionCode = tenant.region();
  const currentCountry = formUtils.queryValue(form.getFieldValue('countryCode'));
  return useMemo(() => {
    return (CurrentRegionMap[regionCode] || currentCountry) === currentCountry;
  }, [currentCountry]);
};
