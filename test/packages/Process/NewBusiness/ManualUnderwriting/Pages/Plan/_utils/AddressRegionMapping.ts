import { tenant, Region } from '@/components/Tenant';

const addressRegionMapping = () => {
  const regionCode = tenant.region();
  if (regionCode === Region.PH) {
    return {
      country: 'province',
      province: 'city',
    };
  }
  if (regionCode === Region.VN) {
    return {
      country: 'city',
      city: 'district',
      district: 'commune',
      commune: 'village',
      village: 'street',
    };
  }
  if (regionCode === Region.KH) {
    return {
      country: 'province',
      province: 'district',
      district: 'commune',
      commune: 'village',
      village: 'street',
    };
  }
  if (regionCode === Region.ID) {
    return {
      country: 'province',
      province: 'city',
      city: 'zipCode',
    };
  }
  return {
    country: 'province',
    province: 'district',
    district: 'commune',
    commune: 'village',
    village: 'street',
  };
};

export default addressRegionMapping;
