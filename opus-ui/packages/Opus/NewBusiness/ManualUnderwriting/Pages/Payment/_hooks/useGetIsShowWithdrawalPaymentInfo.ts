import { tenant, Region } from '@/components/Tenant';

export default () => {
  return tenant.region({
    [Region.TH]: true,
    [Region.ID]: true,
    notMatch: false,
  });
};
