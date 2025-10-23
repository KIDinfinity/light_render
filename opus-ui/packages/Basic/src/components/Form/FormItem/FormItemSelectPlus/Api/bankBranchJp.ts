import lodash from 'lodash';
import { dataMaping } from 'claim/pages/utils/claimUtils';
import { tenant } from '@/components/Tenant';
import {
  searchByBankCodeAndBranchCodesAndRegionCode as bankBranchJp,
} from '@/services/miscStandardBankControllerService';

export default async (codes: string[], extraData: any) => {
  const regionCode = tenant.region();
  const response = await bankBranchJp({
    bankCode: extraData,
    codes,
    regionCode,
  });
  const list = lodash.get(response, 'resultData', []);
  lodash.set(response, 'resultData', dataMaping(list, 'branchCode', 'branchName'));
  return response;
}
