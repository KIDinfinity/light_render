import lodash from 'lodash';
import { tenant } from '@/components/Tenant';
import { dataMaping } from 'claim/pages/utils/claimUtils';
import { searchByBranchCodesAndRegionCode as bankBranch } from '@/services/miscStandardBankControllerService';

export default async (codes: string[]) => {
  const regionCode = tenant.region();
  const response = await bankBranch({
    codes,
    regionCode,
  });
  const list = lodash.get(response, 'resultData', []);
  lodash.set(response, 'resultData', dataMaping(list, 'branchCode', 'branchName'));
  return response;
};
