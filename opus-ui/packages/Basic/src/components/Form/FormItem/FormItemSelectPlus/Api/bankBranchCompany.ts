import lodash from 'lodash';
import { tenant } from '@/components/Tenant';
import { dataMaping } from 'claim/pages/utils/claimUtils';
import { searchName } from '@/services/miscDictionaryControllerService';
export default async (codes: string[]) => {
  const response = await searchName({
    codes,
    typeCode: 'Dropdown_POL_Branch',
  });
  const list = lodash.get(response, 'resultData', []);
  lodash.set(response, 'resultData', dataMaping(list, 'branchCode', 'branchName'));
  return response;
};
