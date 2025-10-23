import { listJpMenu } from '@/services/ccJpDataControllerService';
import { handleMenu } from 'configuration/pages/ConfigurationCenter/Utils/Menu';
import { LS, LSKey } from '@/utils/cache';
import lodash from 'lodash';

export default function* (_: any, { put, call, select, take }: any) {
  let permissionMenus = yield select((state: any) => state.authController?.permissionMenus);
  if (!permissionMenus?.length) {
    yield take('authController/listPermissionMenu/@@end');
    permissionMenus = yield select((state: any) => state.authController?.permissionMenus);
  }
  const response = yield call(listJpMenu);
  if (response?.success) {
    const data: any = handleMenu(response?.resultData?.subFunctionList, permissionMenus);
    const { menuTemp = [], menu = {} } = data;
    let { defaultMenu: currentMenu, openKeys } = data;
    const { openKeys: storageOpenKeys, currentMenu: storageMenu } =
      LS.getItem(LSKey.CONFIG_MENUDATA) || {};
    if (!lodash.isEmpty(storageOpenKeys) && !lodash.isEmpty(storageMenu)) {
      currentMenu = storageMenu;
      openKeys = storageOpenKeys;
    }
    const { id: functionId, functionCode } = currentMenu || {};
    yield put({
      type: 'saveMenu',
      payload: {
        menu,
        menuTemp,
        currentMenu,
        openKeys,
      },
    });
    if (currentMenu) {
      yield put({
        type: 'getFunction',
        payload: {
          functionId,
          functionCode,
        },
      });
    }
  }
}
