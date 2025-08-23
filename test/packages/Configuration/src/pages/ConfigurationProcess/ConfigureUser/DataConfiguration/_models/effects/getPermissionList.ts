import { combinePermission } from '@/services/ccCombineDataControllerService';
import { WhereOperator } from 'configuration/pages/ConfigurationCenter/Utils/Constant';

export default [
  // eslint-disable-next-line func-names
  function* ({ payload }: any, { call, put, select }: any) {
    const { role_code } = payload;
    const {
      functionData: { id: functionId },
    } = yield select((state: any) => state.configureUserController);
    const { allRolePermissions } = yield select((state: any) => state.configureUserController);
    if (allRolePermissions && allRolePermissions?.[role_code]) return;

    const response = yield call(combinePermission, {
      functionId,
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
        type: 'saveCacheAllRolePermissions',
        payload: {
          allRolePermissions: { [role_code]: response?.resultData?.[0] },
        },
      });
    }
  },
  { type: 'takeLatest' },
];
