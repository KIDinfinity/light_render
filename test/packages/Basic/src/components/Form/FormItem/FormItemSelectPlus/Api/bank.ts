import lodash from 'lodash';
import { tenant } from '@/components/Tenant';
import { dataMaping } from 'claim/pages/utils/claimUtils';
import {
  searchByCodesAndRegionCode as bank,
} from '@/services/miscStandardBankControllerService';

export default async (codes: string[]): Promise<any> => {
  const regionCode = tenant.region();
  const response = await bank({
    codes,
    regionCode,
  });
  const list = lodash.get(response, 'resultData', []);
  lodash.set(response, 'resultData', dataMaping(list, 'bankCode', 'bankName'));
  return response;
}
