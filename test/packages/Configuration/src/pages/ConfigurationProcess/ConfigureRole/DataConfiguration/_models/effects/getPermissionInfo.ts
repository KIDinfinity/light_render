import { allPermission } from '@/services/ccCombineDataControllerService';

export default function* ({ payload }: any, { call, put, select }: any) {
  const {
    functionData: { id: functionId },
  } = yield select((state: any) => state.configureRoleController);
  const response = yield call(allPermission, {
    functionId,
    page: {
      currentPage: 1,
      pageSize: 10,
    },
  });
  if (response?.success && response?.resultData) {
    yield put({
      type: 'saveAllPermissionInfo',
      payload: {
        allPermissionInfo: response.resultData || [],
      },
    });
  }
}
