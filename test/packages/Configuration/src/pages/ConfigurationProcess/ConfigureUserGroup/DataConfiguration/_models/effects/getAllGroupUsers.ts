import { combineUserGroup } from '@/services/ccCombineDataControllerService';
import { WhereOperator } from 'configuration/pages/ConfigurationCenter/Utils/Constant';

export default function* (_: any, { call, put, select }: any) {
  const {
    functionData: { id: functionId },
  } = yield select((state: any) => state.configureUserGroupController);
  const response = yield call(combineUserGroup, {
    functionId,
    page: {
      currentPage: 1,
      pageSize: 9999,
    },
    whereConditions: [
      {
        fieldName: '',
        firstFieldValue: '',
        whereOperator: WhereOperator.equal_to,
      },
    ],
  });

  if (response?.success && response?.resultData) {
    // 如果是 taskModal页面设置 AllGroupUsers
    yield put({
      type: 'saveCacheAllGroupUsers',
      payload: {
        allGroupUsers: response.resultData || {},
      },
    });
  }
}
