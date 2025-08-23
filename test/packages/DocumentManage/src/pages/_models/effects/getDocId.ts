import lodash from 'lodash';
import { getDocId } from '@/services/docViewControllerService';

/**
 * 从task detail中获取case information
 */
export default function* getDocumentId(_: any, { call, put }: any) {
  const response = yield call(getDocId, []);

  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
  if (success && resultData) {
    yield put({
      type: 'saveDocId',
      payload: resultData
        ?.filter((data) => data?.externalDocTypeCode)
        ?.map((data) => {
          return {
            dictCode: data.id,
            dictName: data.docName
              ? `${data.externalDocTypeCode} - ${data.docName}`
              : `${data.externalDocTypeCode}`,
            data: {
              externalDocumentTypeCode: data.externalDocTypeCode,
              documentTypeCode: data.docTypeCode,
            },
          };
        }),
    });
  }
}
