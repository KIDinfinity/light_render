import lodash from 'lodash';
import rbac2ResourceControllerService from '@/services/rbac2ResourceControllerService';

export default function* (_: any, { call, put, select }: any) {
  const roleData = yield select((state) => state.userManagement.roleData);

  const response = yield call(rbac2ResourceControllerService.findMaskByRoles, roleData);

  if (lodash.isPlainObject(response) && response.success && lodash.isArray(response.resultData)) {
    yield put({
      type: 'savePermissionInfoDataMasking',
      payload: {
        permissionDataMasking: response.resultData,
      },
    });
  }
}
