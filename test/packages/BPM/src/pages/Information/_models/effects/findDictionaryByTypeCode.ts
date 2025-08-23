import { serialize as objectToFormData } from 'object-to-formdata';
import lodash from 'lodash';
import miscDictionaryControllerService from '@/services/miscDictionaryControllerService';

export default function* findDictionaryByTypeCode({ payload }: any, { call, put }: any) {
  const { typeCode, dictCode, id } = lodash.pick(payload, ['typeCode', 'dictCode', 'id']);
  if (!typeCode) return;
  const response = yield call(
    miscDictionaryControllerService.findDictionaryByTypeCode,
    objectToFormData({ typeCode })
  );
  if (lodash.isPlainObject(response) && response.success && lodash.isArray(response.resultData)) {
    const categoryReasonTemplate = lodash
      .chain(response.resultData)
      .find((item: any) => item?.dictCode === dictCode)
      .get('dictName')
      .value();
    yield put({
      type: 'saveCategoryReasonTemplate',
      payload: {
        categoryReasonTemplate,
        id,
      },
    });
  }
  return response;
}
