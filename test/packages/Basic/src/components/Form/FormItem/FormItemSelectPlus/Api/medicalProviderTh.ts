import lodash from 'lodash';
import { tenant } from '@/components/Tenant';
import { dataMaping } from 'claim/pages/utils/claimUtils';
import {
  searchInfoByRegionCode as medicalProviderTh,
} from '@/services/claimMedicalProviderInformationControllerService';

export default async (params: any) => {
  const regionCode = tenant.region();
  const response = await medicalProviderTh({ codes: params, regionCode });
  if (response && response.success && response.resultData) {
    const list = lodash.get(response, 'resultData', []);
    const rows = dataMaping(
      list,
      'medicalProviderCode',
      'medicalProviderName',
      (data: any) =>
        `${data?.medicalProviderName}${data?.provinceDescription ? `, ${data?.provinceDescription}` : ''
        }`
    );
    lodash.set(response, 'resultData', rows);
    return response;
  }
  return [];
}
