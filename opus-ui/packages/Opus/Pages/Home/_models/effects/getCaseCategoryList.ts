import lodash from 'lodash';
import { findCaseCategoryDictionaries } from '@/services/miscDictionaryControllerService';

export default function* (_: any, { select, call, put }: any): Generator<any, any, any> {
  const response = yield call(findCaseCategoryDictionaries, {});
  if (lodash.isPlainObject(response) && !!response?.success) {
    yield put({
      type: 'saveCaseCategoryList',
      payload: {
        caseCategoryList: response.resultData,
      },
    });
  }

  return response;
}
