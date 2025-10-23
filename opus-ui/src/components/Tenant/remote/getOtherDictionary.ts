import lodash from 'lodash';
import { getOtherDictionary } from '@/services/miscDictionaryControllerService';

export default async ({ companyCode }: any) => {
  const response = await getOtherDictionary(companyCode);

  if (
    lodash.isPlainObject(response) &&
    response.success &&
    lodash.isPlainObject(response.resultData)
  ) {
    return response.resultData;
  }

  return false;
};
