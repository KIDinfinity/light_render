import { tenant } from '@/components/Tenant';
import { searchNameByRegion as surgeryProcedure } from '@/services/claimSurgeryProcedureInformationControllerService';

export default async (codes: string[]) => {
  const regionCode = tenant.region();
  const response = await surgeryProcedure({
    codes,
    regionCode,
  });
  return response;
}
