import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import { findDictionaryByTypeCode } from '@/services/miscDictionaryControllerService';
import { getDictionaryArrayByTypeCode } from '@/utils/dictionary';
import { tenant } from '@/components/Tenant';

export default {
  namespace: 'selectOptionsDictionary',
  state: {
    dictionary: {},
  },
  effects: {
    *get({ payload }: any, { call, put, select }: any) {
      const dictionary = yield select((state: any) => state.selectOptionsDictionary.dictionary);
      const typeCode = lodash.get(payload, 'typeCode', '');
      if (!typeCode) {
        return [];
      }

      const currentCodeOptions = lodash.get(dictionary, typeCode);
      if (currentCodeOptions) {
        return currentCodeOptions;
      }
      if (!currentCodeOptions) {
        const language = tenant.getLocaleLang();
        // 优先从本地的存储获取
        const localDict = getDictionaryArrayByTypeCode({ typeCode, language });
        let options = localDict;
        if (!options.length) {
          const response = yield call(
            findDictionaryByTypeCode,
            objectToFormData({
              typeCode,
            })
          );
          options = lodash.get(response, 'resultData', []);
        }

        yield put({
          type: 'set',
          payload: {
            typeCode,
            options,
          },
        });
        return options;
      }
      return [];
    },
  },
  reducers: {
    set(state: any, action: any) {
      const dictionary = lodash.get(state, 'dictionary');
      const typeCode = lodash.get(action, 'payload.typeCode', '');
      const options = lodash.get(action, 'payload.options', []);
      const newDictionary = {
        ...dictionary,
        [typeCode]: options,
      };
      return {
        ...state,
        dictionary: newDictionary,
      };
    },
  },
};
