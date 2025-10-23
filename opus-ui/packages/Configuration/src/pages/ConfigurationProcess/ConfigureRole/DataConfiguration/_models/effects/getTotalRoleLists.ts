import { queryRoleOfPermission } from '@/services/ccCombineDataControllerService';
import { WhereOperator } from 'configuration/pages/ConfigurationCenter/Utils/Constant';

export default [
  // eslint-disable-next-line func-names
  function* ({ payload }: any, { call, put, select }: any) {
    const {
      functionData: { id: functionId },
    } = yield select((state: any) => state.configureRoleController);
    const response = yield call(queryRoleOfPermission, {
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
      yield put({
        type: 'saveCacheAllRoles',
        payload: {
          allRoleLists:response?.resultData
        },
      });
    }
  },
  { type: 'takeLatest' },
];
