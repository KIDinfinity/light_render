import { listPermissionMenu } from '@/services/rbac2ResourceControllerService';

export default function* ({ payload }: any, { put, call }: any) {
  const response = yield call(listPermissionMenu, payload);
  if (response && response.success) {
    yield put({
      type: 'saveMenuPermissions',
      payload: {
        permissionMenus: response?.resultData || [],
      },
    });
  }
}
