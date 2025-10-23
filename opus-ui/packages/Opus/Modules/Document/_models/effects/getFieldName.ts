import { supplementDocFileName } from '@/services/docManagementControllerService';

export default function* getFieldName({ payload }: any, { call, put }: any) {
  const { documentItem } = payload;

  const response = yield call(supplementDocFileName, { docId: documentItem.docId });
  if (response && response.success) {
    const newDocument = {
      ...documentItem,
      name: response.resultData.docFileName,
      mimeType: response.resultData.mimeType,
    };
    yield put({
      type: 'updateDocuments',
      payload: {
        documents: newDocument,
      },
    });
    yield put({
      type: 'saveImageUrl',
      payload: {
        documentItem: newDocument,
      },
    });
  }
}
