import lodash from 'lodash';
import { loopSearchDocView } from '@/services/docViewControllerService';

export default function* retryUpload({ payload }: any, { call, put }: any) {
  const { documentIdList } = payload;
  const response = yield call(loopSearchDocView, documentIdList);
  if (response && response.success) {
    const newDocuments = response.resultData
      .filter((item) => lodash.toLower(item.status) !== 'todo')
      .map((item) => item.docViewVO);

    if (newDocuments.length === 0) {
      return false;
    }

    yield put({
      type: 'updateDocumentsList',
      payload: {
        documents: newDocuments,
        allUpdate: true,
      },
    });
    return true;
  }
}
