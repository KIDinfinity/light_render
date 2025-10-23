
import { tenant } from '@/components/Tenant';
import {
  searchNameByRegionCode as medicalProvider,
} from '@/services/claimMedicalProviderInformationControllerService';

export default async (codes: string[]) => {
  const regionCode = tenant.region();
  const response = await medicalProvider({
    codes,
    regionCode,
  });
  return response;
}
