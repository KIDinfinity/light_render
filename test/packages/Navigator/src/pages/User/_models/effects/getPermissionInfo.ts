import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import rbac2GroupControllerService from '@/services/rbac2GroupControllerService';

export default function* (_: any, { call, put, select }: any) {
  const userId = yield select((state) => state.user.currentUser?.userId);

  if (lodash.isString(userId) && userId) {
    const response = yield call(
      rbac2GroupControllerService.findUserGroupInformationByUserId,
      objectToFormData({ userId })
    );

    if (lodash.isPlainObject(response) && response.success && lodash.isArray(response.resultData)) {
      yield put({
        type: 'saveRoleData',
        payload: {
          roleData: response.resultData,
        },
      });

      yield put({
        type: 'getPermissionInfoOfProcess',
      });

      yield put({
        type: 'getPermissionInfoOfCommon',
      });

      yield put({
        type: 'getPermissionInfoOfTransactionLimit',
      });

      yield put({
        type: 'getPermissionInfoOfDataMasking',
      });
    }
  }
}
