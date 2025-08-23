import { useMemo } from 'react';
import { tenant, Region } from '@/components/Tenant';

export default ({ contactSeqNum }: any) => {
  return useMemo(() => {
    return tenant.region({
      [Region.ID]: contactSeqNum > 1 ? true : false,
      notMatch: true,
    });
  }, [contactSeqNum]);
};
