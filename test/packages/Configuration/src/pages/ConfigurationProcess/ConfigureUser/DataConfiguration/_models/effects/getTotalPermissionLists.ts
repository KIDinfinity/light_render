import { combinePermission } from '@/services/ccCombineDataControllerService';
import { WhereOperator } from 'configuration/pages/ConfigurationCenter/Utils/Constant';
import { reduce } from 'lodash';

export default [
  // eslint-disable-next-line func-names
  function* ({ payload }: any, { call, put, select }: any) {
    const {
      functionData: { id: functionId },
    } = yield select((state: any) => state.configureUserController);
    const response = yield call(combinePermission, {
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
      const list = response?.resultData;
      const allRolePermissions = reduce(
        list,
        (listMap, item) => {
          return { ...listMap, [item?.data?.role_code]: item };
        },
        {}
      );
      yield put({
        type: 'saveCacheAllRolePermissions',
        payload: {
          allRolePermissions,
        },
      });
    }
  },
  { type: 'takeLatest' },
];
