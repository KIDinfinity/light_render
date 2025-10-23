import { tenant } from '@/components/Tenant';
import { searchNameByRegion as product } from '@/services/claimProductInformationControllerService';

export default async (codes: string[]) => {
  const regionCode = tenant.region();
  const response = await product({
    codes,
    regionCode,
  });
  return response;
}
