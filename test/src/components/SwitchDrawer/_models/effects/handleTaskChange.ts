import lodash from 'lodash';
import onPermissionMenusWhite from '../Function/onPermissionMenusWhite';

export default function* (action: any, { select, put }: any) {
  const { record } = action.payload;
  const permissionMenus = yield select((state: any) => state.authController.permissionMenus);
  const { caseCategory, currentActivityKey } = yield select(
    (state: any) => state.workspaceSwitchOn.processInfo
  );
  const recordCurrentActivityKey = record.currentActivityKey
    ? record.currentActivityKey
    : record.activityKey;
  if (record.caseCategory === caseCategory && recordCurrentActivityKey === currentActivityKey)
    return;

  const listDisplayConfig = yield select((state: any) => state.workspaceSwitchOn.listDisplayConfig);
  const displayItem = lodash.find(
    listDisplayConfig,
    (item: any) =>
      item.activityKey === recordCurrentActivityKey && item.caseCategory === record.caseCategory
  );

  yield put({
    type: 'insured360/saveTaskInfo',
    payload: {
      taskDetail: {
        ...record,
      },
    },
  });

  if (!displayItem) {
    yield put({
      type: 'clearShow',
    });
  } else if (onPermissionMenusWhite(permissionMenus)) {
    yield put({
      type: 'updateTabShowList',
      payload: {
        displayItem,
      },
    });
  }
}
