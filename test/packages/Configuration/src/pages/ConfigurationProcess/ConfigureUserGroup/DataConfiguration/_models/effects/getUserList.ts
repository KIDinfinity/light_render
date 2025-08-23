import { combineUser } from '@/services/ccCombineDataControllerService';
import { WhereOperator } from 'configuration/pages/ConfigurationCenter/Utils/Constant';

export default function* ({ payload }: any, { call, put, select }: any) {
  const { group_code } = payload;
  const currentMenu = yield select((state: any) => state.configurationController?.currentMenu);
  const {
    functionData: { id: functionId },
  } = yield select((state: any) => state.configureUserGroupController);
  const response = yield call(combineUser, {
    functionId: currentMenu?.id || functionId,
    page: {
      currentPage: 1,
      pageSize: 9999,
    },
    whereConditions: [
      {
        fieldName: 'group_code',
        firstFieldValue: group_code,
        whereOperator: WhereOperator.equal_to,
      },
    ],
  });

  if (response?.success && response?.resultData) {
    yield put({
      type: 'saveUserList',
      payload: {
        userList: response.resultData || {},
      },
    });
  }
}
