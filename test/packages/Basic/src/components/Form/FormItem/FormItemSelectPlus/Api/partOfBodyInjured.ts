import { tenant } from '@/components/Tenant';
import { searchNameByRegion as partOfBodyInjured } from '@/services/claimPartOfBodyInjuredInformationControllerService';

export default async (codes: string[]) => {
  const regionCode = tenant.region();
  const response = await partOfBodyInjured({
    codes,
    regionCode,
  });
  return response;
}
