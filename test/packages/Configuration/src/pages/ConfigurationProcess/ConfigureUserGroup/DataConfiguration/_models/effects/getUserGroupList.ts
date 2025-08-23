import { queryUserGroupOfRole } from '@/services/ccCombineDataControllerService';
import { WhereOperator } from 'configuration/pages/ConfigurationCenter/Utils/Constant';

export default function* ({ payload }: any, { call, put, select }: any) {
  const { role_code } = payload;
  if (!role_code) {
    yield put({
      type: 'saveUserGroupList',
      payload: {
        userGroupList: [],
      },
    });
    return;
  }

  const currentMenu = yield select((state: any) => state.configurationController?.currentMenu);
  const {
    functionData: { id: functionId },
  } = yield select((state: any) => state.configurationController);
  const response = yield call(queryUserGroupOfRole, {
    functionId: currentMenu?.id|| functionId,
    page: {
      currentPage: 1,
      pageSize: 9999,
    },
    whereConditions: [
      {
        fieldName: 'role_code',
        firstFieldValue: role_code,
        whereOperator: WhereOperator.equal_to,
      },
    ],
  });

  if (response?.success && response?.resultData) {
    yield put({
      type: 'saveUserGroupList',
      payload: {
        userGroupList: response.resultData || [],
      },
    });
  }
}
