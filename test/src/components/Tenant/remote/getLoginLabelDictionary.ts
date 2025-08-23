import lodash from 'lodash';
import { getLoginLabelDictionary } from '@/services/miscDictionaryControllerService';

/**
 * 未登录的国际化
 * TODO:这里给的东西还是太多了,应该只是给需要的几个
 */
export default async () => {
  const response = await getLoginLabelDictionary();

  if (
    lodash.isPlainObject(response) &&
    response.success &&
    lodash.isPlainObject(response.resultData)
  ) {
    return response.resultData;
  }

  return {};
};
