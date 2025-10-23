import lodash from 'lodash';
import { getDropdownDictionary } from '@/services/miscDictionaryControllerService';

export default async ({ companyCode }: any) => {
  const response = await getDropdownDictionary(companyCode);

  if (
    lodash.isPlainObject(response) &&
    response.success &&
    lodash.isPlainObject(response.resultData)
  ) {
    return response.resultData;
  }

  return false;
};
