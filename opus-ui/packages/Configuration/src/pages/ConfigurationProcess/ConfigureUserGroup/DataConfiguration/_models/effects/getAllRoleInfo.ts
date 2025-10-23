import { allRoleInfo } from '@/services/ccCombineDataControllerService';

export default function* (_: any, { call, put, select }: any) {
  const {
    functionData: { id: functionId },
  } = yield select((state: any) => state.configureUserGroupController);
  const response = yield call(allRoleInfo, {
    functionId,
    page: {
      currentPage: 1,
      pageSize: 10,
    },
  });
  if (response?.success) {
    yield put({
      type: 'saveAllRoleInfo',
      payload: {
        allRoleInfo: response.resultData || [],
      },
    });
  }
}

