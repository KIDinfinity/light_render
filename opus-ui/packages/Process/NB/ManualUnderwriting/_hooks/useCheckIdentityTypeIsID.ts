import { useMemo } from 'react';
import { tenant, Region } from '@/components/Tenant';

export default ({ monitorValue }: any) => {
  return useMemo(() => {
    return tenant.region({
      [Region.ID]: () => monitorValue === 'ID',
      notMatch: false,
    });
  }, [monitorValue]);
};
