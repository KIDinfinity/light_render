import lodash from 'lodash';
import miscDictionaryControllerService from '@/services/miscDictionaryControllerService';
import { serialize as objectToFormData } from 'object-to-formdata';
import type { IEffects } from '../interfaces/index';

/**
 * 加载全量category 字典
 */
export default function* loadCategoryDict(_, { put, call }: IEffects) {
  const categoryDictResponse = yield call(
    miscDictionaryControllerService.findDictionaryByTypeCode,
    objectToFormData({
      typeCode: 'category',
    })
  );
  const list = lodash.get(categoryDictResponse, 'resultData', []);
  const allCategoryList = lodash.map(list, (dict) => ({
    dictName: dict.dictName,
    dictCode: dict.dictCode,
  }));
  yield put({
    type: 'setCategoryDict',
    payload: {
      allCategoryList,
    },
  });
}
