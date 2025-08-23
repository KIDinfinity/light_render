import { isNil } from 'lodash';
import { TableVersion } from 'navigator/enum/HomeTableVersion';

/**
 * 控制Dashboard的隐藏显示
 * @param param0 {dashboardHidden: Boolean} 传入控制Dashboard的隐藏/显示，不传则根据当前redux dashboardHidden 判断
 * @param param1
 * @returns
 */
export default function* handleDashboardHidden({ payload }: any, { select, put }: any) {
  const { dashboardHidden } = payload || {};

  const tableVersion = yield select((state: any) => state.navigatorHomeWatching.homeTableVersion);

  if (tableVersion !== TableVersion.V2) {
    return;
  }

  let dashboardHiddenParam;
  const currentHiddenState = yield select(
    (state: any) => state.navigatorHomeWatching.dashboardHidden
  );

  if (isNil(dashboardHidden)) {
    dashboardHiddenParam = !currentHiddenState;
  } else {
    dashboardHiddenParam = dashboardHidden;
  }
  yield put({ type: 'saveDashboardVisible', payload: { dashboardHidden: dashboardHiddenParam } });

  const searchQuery = select((state: any) => state.advancedQueryController.stateOfSearch);
  if (!dashboardHiddenParam) {
    yield put({
      type: 'advancedQueryController/saveStateOfSearch',
      payload: {
        stateOfSearch: { ...searchQuery, pagination: { ...searchQuery?.pagination, pageSize: 10 } },
      },
    });
  } else {
    yield put({
      type: 'advancedQueryController/saveStateOfSearch',
      payload: {
        stateOfSearch: { ...searchQuery, pagination: { ...searchQuery?.pagination, pageSize: 20 } },
      },
    });
  }
}
