import lodash from 'lodash';
import { getLabelDictionary } from '@/services/miscDictionaryControllerService';

/**
 * 登录后的国际化
 */
export default async () => {
  const response = await getLabelDictionary();

  if (
    lodash.isPlainObject(response) &&
    response.success &&
    lodash.isPlainObject(response.resultData)
  ) {
    return response.resultData;
  }

  return false;
};
