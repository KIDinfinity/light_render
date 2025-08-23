import { tenant } from '@/components/Tenant';
import { searchNameByRegionCode as serviceItem } from '@/services/claimServiceItemInformationControllerService';

export default async (codes: string[]): Promise<any> => {
  const regionCode = tenant.region();
  const response = await serviceItem({
    codes,
    regionCode,
  });
  return response;
}

