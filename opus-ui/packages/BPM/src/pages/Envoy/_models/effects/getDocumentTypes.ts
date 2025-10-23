import lodash from 'lodash';
import { findDictionariesByTypeCode } from '@/services/miscDictionaryControllerService';
import { serialize as objectToFormData } from 'object-to-formdata';

// 记载封筒书类和必要书类,只有language 为ja_JP时接口才会返回数据
function* getDocumentTypes(_: any, { call, put, select }: any) {
  const response = yield call(
    findDictionariesByTypeCode,
    objectToFormData({
      typeCode: 'documentType_all',
    })
  );

  if (lodash.isPlainObject(response) && response.success && lodash.isArray(response.resultData)) {
    const allDocumentTypes = lodash.get(response, 'resultData');
    const allDocumentTypesKey = lodash.map(allDocumentTypes, (item: any) => item.dictCode);
    yield put.resolve({
      type: 'dictionaryController/getListDocsByGroupCode',
      payload: {
        groupCodes: allDocumentTypesKey,
      },
    });
    const newDocumentList = yield select((state: any) =>
      lodash.pick(state.dictionaryController, allDocumentTypesKey)
    );
    lodash.forEach(allDocumentTypes, (item: any) => {
      lodash.set(item, 'dicts', newDocumentList[item?.dictCode]);
    });

    yield put({
      type: 'saveDocumentTypes',
      payload: {
        allDocumentTypes,
      },
    });
  }
}

export default getDocumentTypes;
