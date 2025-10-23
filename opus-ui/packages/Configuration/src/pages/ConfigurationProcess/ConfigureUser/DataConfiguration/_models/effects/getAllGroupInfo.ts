import { allGroupInfo } from '@/services/ccCombineDataControllerService';

export default function* ({ payload }: any, { call, put, select }: any) {
  const {
    functionData: { id: functionId },
  } = yield select((state: any) => state.configureUserController);
  const response = yield call(allGroupInfo, {
    functionId,
    page: {
      currentPage: 1,
      pageSize: 10,
    },
  });
  if (response?.success && response?.resultData) {
    yield put({
      type: 'saveAllGroupInfo',
      payload: {
        allGroupInfo: response.resultData || [],
      },
    });
  }
}
