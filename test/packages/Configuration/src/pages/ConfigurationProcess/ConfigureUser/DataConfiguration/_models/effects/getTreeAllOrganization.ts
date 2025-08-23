import { treeAllOrganization } from '@/services/ccCombineDataControllerService';

export default function* ({ payload }: any, { call, put }: any) {
  const response = yield call(treeAllOrganization);
  if (response?.success && response?.resultData) {
    yield put({
      type: 'saveAllOrganization',
      payload: {
        allOrganization: response.resultData || [],
      },
    });
  }
}
