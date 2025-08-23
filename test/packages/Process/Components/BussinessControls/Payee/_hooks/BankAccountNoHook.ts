import { Region, tenant } from '@/components/Tenant';

export default () => {
  return tenant.region({
    [Region.TH]: () => {
      return { existCodes: ['05', '06'] };
    },
    notMatch: () => ({}),
  });
};
