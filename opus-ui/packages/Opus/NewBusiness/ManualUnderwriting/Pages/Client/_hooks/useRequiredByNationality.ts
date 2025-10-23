import { useMemo } from 'react';
import { tenant, Region } from '@/components/Tenant';

export default ({ nationality }: any) => {
  return useMemo(() => {
    return tenant.region({
      [Region.ID]: () => nationality !== 'RI',
      notMatch: true,
    });
  }, [nationality]);
};
