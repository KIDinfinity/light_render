import lodash from 'lodash';
import { saveDocLayout } from '@/services/docViewControllerService';

export default function* updateDocLayout({ payload }: any, { call, select, put }: any) {
  const selectedId = yield select((state: any) => state.documentManagement.selectedId);
  const documentList = yield select(
    ({ documentManagement }: any) => documentManagement.documentList
  );
  const businessNoDocumentList = yield select(
    ({ documentManagement }: any) => documentManagement.businessNoDocumentList
  );
  const showType = yield select(({ documentManagement }: any) => documentManagement.showType);
  const List = showType === 'caseNo' ? documentList : businessNoDocumentList;

  const response = yield call(saveDocLayout, { ...payload, id: selectedId });

  if (lodash.isPlainObject(response) && response.success) {
    const newDocuments = List.find((item) => item.id === selectedId);
    yield put({
      type: 'updateDocuments',
      payload: { documents: { ...newDocuments, ...payload }, allUpdate: true },
    });
  }
}
