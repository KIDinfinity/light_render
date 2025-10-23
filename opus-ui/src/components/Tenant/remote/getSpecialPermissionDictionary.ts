import lodash from 'lodash';
import { getSpecialPermissionDictionary } from '@/services/miscDictionaryControllerService';

/**
 * 单独获取权限的接口下拉
 * TODO:这里给的东西还是太多了,应该只是给需要的几个
 */

const params = ['Label_BPM_CaseCategory'];
export default async () => {
  const response = await getSpecialPermissionDictionary(params);

  if (
    lodash.isPlainObject(response) &&
    response.success &&
    lodash.isPlainObject(response.resultData)
  ) {
    return lodash
      .chain(lodash.keys(response.resultData))
      .reduce((obj: any, el: any) => {
        return {
          ...obj,
          [`Special_${el}`]: response.resultData[el],
        };
      }, {})
      .value();
  }

  return false;
};
