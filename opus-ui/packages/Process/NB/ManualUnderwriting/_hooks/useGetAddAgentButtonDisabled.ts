import { useMemo } from 'react';
import useGetDistributionChannel from 'process/NB/ManualUnderwriting/_hooks/useGetDistributionChannel';
import { tenant, Region } from '@/components/Tenant';

export default () => {
  const data = useGetDistributionChannel();
  return useMemo(() => {
    return tenant.region({
      [Region.TH]: () => {
        return data?.length >= 2;
      },
      notMatch: false,
    });
  }, [data]);
};
