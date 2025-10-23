import lodash from 'lodash';
import { getDictionaryMap } from '@/services/miscDictionaryControllerService';

export default async () => {
  const response = await getDictionaryMap();

  if (
    lodash.isPlainObject(response) &&
    response.success &&
    lodash.isPlainObject(response.resultData)
  ) {
    return response.resultData;
  }

  return {};
};
