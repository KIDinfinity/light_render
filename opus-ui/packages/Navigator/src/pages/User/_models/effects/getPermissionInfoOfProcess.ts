import lodash from 'lodash';
import rbac2ActivityResourceControllerService from '@/services/rbac2ActivityResourceControllerService';

export default function* (_: any, { call, put, select }: any) {
  const roleData = yield select((state) => state.userManagement.roleData);
  const [findAuthActivityByRoleCodesV2] = yield [
    call(rbac2ActivityResourceControllerService.findAuthActivityByRoleCodesV2, roleData),
  ];

  if (
    lodash.isPlainObject(findAuthActivityByRoleCodesV2.resultData) &&
    findAuthActivityByRoleCodesV2.success
  ) {
    yield put({
      type: 'savePermissionInfoOfProcess',
      payload: {
        findAuthActivityByRoleCodesV2: findAuthActivityByRoleCodesV2.resultData,
      },
    });
  }
}
