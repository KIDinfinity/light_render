import { queryRoleOfPermission } from '@/services/ccCombineDataControllerService';
import { WhereOperator } from 'configuration/pages/ConfigurationCenter/Utils/Constant';

export default function* ({ payload }: any, { call, put, select }: any) {
  const { permission_code } = payload;
  if (!permission_code) {
    yield put({
      type: 'saveRoleList',
      payload: {
        roleList: [],
      },
    });
    return;
  }

  const currentMenu = yield select((state: any) => state.configurationController?.currentMenu);

  const response = yield call(queryRoleOfPermission, {
    functionId: currentMenu?.id,
    page: {
      currentPage: 1,
      pageSize: 9999,
    },
    whereConditions: [
      {
        fieldName: 'permission_code',
        firstFieldValue: permission_code,
        whereOperator: WhereOperator.equal_to,
      },
    ],
  });

  if (response?.success && response?.resultData) {
    yield put({
      type: 'saveRoleList',
      payload: {
        roleList: response?.resultData?.[permission_code] || [],
      },
    });
  }
}
