import { tenant } from '@/components/Tenant';
import { searchNameByRegionCode as diagnosis } from '@/services/claimDiagnosisInformationControllerService';

export default async (codes: string[]) => {
  const regionCode = tenant.region();
  const response = await diagnosis({
    codes,
    regionCode,
  });
  return response;
};
