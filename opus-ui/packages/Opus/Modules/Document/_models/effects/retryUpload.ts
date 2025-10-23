import { retryUploadDoc } from '@/services/docManagementControllerService';

export default function* retryUpload({ payload }: any, { call, put }: any) {
  const { documentItem } = payload;

  const response = yield call(retryUploadDoc, documentItem);
  if (response && response.success) {
    yield put({
      type: 'updateDocuments',
      payload: {
        documents: { ...documentItem, imageUploadStatus: 'todo' },
        allUpdate: true,
      },
    });
  }
}
